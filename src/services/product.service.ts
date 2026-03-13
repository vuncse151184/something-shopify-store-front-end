import { getShopifyClient } from "@/packages/shopify/client"
import { PRODUCTS_QUERY, PRODUCT_BY_HANDLE_QUERY } from "@/packages/shopify/queries"
import type {
  ShopifyPageInfo,
  ShopifyProduct,
  ShopifyProductEdge,
  ShopifyProductsPage,
} from "@/types/product"

type GetProductsPageOptions = {
  first?: number
  after?: string | null
}

function mapProduct(edge: ShopifyProductEdge): ShopifyProduct {
  return {
    id: edge.node.id,
    title: edge.node.title,
    handle: edge.node.handle,
    tags: edge.node.tags,
    description: edge.node.description,
    images: edge.node.images.edges.map((img: { node: { url: string } }) => img.node),
    variants: edge.node.variants.edges.map((v: { node: ShopifyProduct["variants"][number] }) => v.node),
  }
}

function mapPageInfo(pageInfo?: Partial<ShopifyPageInfo> | null): ShopifyPageInfo {
  return {
    hasNextPage: pageInfo?.hasNextPage ?? false,
    hasPreviousPage: pageInfo?.hasPreviousPage ?? false,
    endCursor: pageInfo?.endCursor ?? null,
    startCursor: pageInfo?.startCursor ?? null,
  }
}

export async function getProductsPage({
  first = 20,
  after = null,
}: GetProductsPageOptions = {}): Promise<ShopifyProductsPage> {
  const shopifyClient = getShopifyClient()
  const { data, errors } = await shopifyClient.request<{
    products: {
      edges: ShopifyProductEdge[]
      pageInfo: ShopifyPageInfo
    }
  }>(PRODUCTS_QUERY, {
    variables: {
      first,
      after,
    },
  })

  if (errors) {
    const details = [
      errors.message,
      errors.networkStatusCode ? `status ${errors.networkStatusCode}` : undefined,
      errors.graphQLErrors?.length ? JSON.stringify(errors.graphQLErrors) : undefined,
    ]
      .filter(Boolean)
      .join(" | ")

    throw new Error(`Shopify products query failed: ${details}`)
  }

  if (!data?.products?.edges) {
    throw new Error("Shopify products query returned no product data")
  }

  return {
    products: data.products.edges.map(mapProduct),
    pageInfo: mapPageInfo(data.products.pageInfo),
  }
}

export async function getProducts(): Promise<ShopifyProduct[]> {
  const products: ShopifyProduct[] = []
  let after: string | null = null
  let hasNextPage = true

  while (hasNextPage) {
    const page = await getProductsPage({ after })
    products.push(...page.products)
    hasNextPage = page.pageInfo.hasNextPage
    after = page.pageInfo.endCursor
  }

  return products
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const shopifyClient = getShopifyClient()
  const { data, errors } = await shopifyClient.request<{
    productByHandle: {
      id: string
      title: string
      handle: string
      description: string
      descriptionHtml: string
      images: { edges: { node: { url: string; altText: string | null; width: number; height: number } }[] }
      variants: {
        edges: {
          node: {
            id: string
            title: string
            sku: string
            selectedOptions: { name: string; value: string }
            quantityAvailable: number
            price: { amount: string; currencyCode: string }
            compareAtPrice: { amount: string; currencyCode: string } | null
          }
        }[]
      }
    } | null
  }>(PRODUCT_BY_HANDLE_QUERY, { variables: { handle } })

  if (errors) {
    const details = [
      errors.message,
      errors.networkStatusCode ? `status ${errors.networkStatusCode}` : undefined,
      errors.graphQLErrors?.length ? JSON.stringify(errors.graphQLErrors) : undefined,
    ]
      .filter(Boolean)
      .join(" | ")

    throw new Error(`Shopify product query failed: ${details}`)
  }

  const product = data?.productByHandle
  if (!product) return null

  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    description: product.description,
    images: product.images.edges.map((img) => img.node),
    variants: product.variants.edges.map((v) => v.node),
  }
}
