import "server-only"
import { getShopifyClient } from "@/packages/shopify/client"
import { COLLECTIONS_QUERY, COLLECTION_BY_HANDLE_QUERY } from "@/packages/shopify/queries"
import type { ShopifyCollection, ShopifyCollectionPage } from "@/types/collection"
import type { ShopifyPageInfo, ShopifyProduct, ShopifyProductEdge } from "@/types/product"

type GetCollectionPageOptions = {
  first?: number
  after?: string | null
}

function mapCollectionProduct(edge: ShopifyProductEdge): ShopifyProduct {
  return {
    id: edge.node.id,
    title: edge.node.title,
    handle: edge.node.handle,
    description: edge.node.description,
    images: edge.node.images.edges.map((img) => img.node),
    variants: edge.node.variants.edges.map((v) => v.node),
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

export async function getCollections(): Promise<ShopifyCollection[]> {
  const client = getShopifyClient()
  const { data, errors } = await client.request<{
    collections: {
      edges: {
        node: {
          id: string
          title: string
          handle: string
          description: string
          image: { url: string; altText: string | null; width: number; height: number } | null
          products: { edges: ShopifyProductEdge[] }
        }
      }[]
    }
  }>(COLLECTIONS_QUERY)

  if (errors) {
    throw new Error(`Shopify collections query failed: ${errors.message}`)
  }

  if (!data?.collections?.edges) {
    throw new Error("Shopify collections query returned no data")
  }

  return data.collections.edges.map((edge) => ({
    id: edge.node.id,
    title: edge.node.title,
    handle: edge.node.handle,
    description: edge.node.description,
    image: edge.node.image ?? (
      edge.node.products.edges[0]?.node.images.edges[0]
        ? { url: edge.node.products.edges[0].node.images.edges[0].node.url, altText: null }
        : null
    ),
    products: edge.node.products.edges.map((p) => ({
      id: p.node.id,
      title: p.node.title,
      handle: p.node.handle,
      description: p.node.description,
      images: p.node.images.edges.map((img) => img.node),
      variants: p.node.variants.edges.map((v) => v.node),
    })),
  }))
}

export async function getCollectionByHandlePage(
  handle: string,
  { first = 20, after = null }: GetCollectionPageOptions = {}
): Promise<ShopifyCollectionPage | null> {
  const client = getShopifyClient()
  const { data, errors } = await client.request<{
    collectionByHandle: {
      id: string
      title: string
      handle: string
      description: string
      image: { url: string; altText: string | null } | null
      products: {
        edges: ShopifyProductEdge[]
        pageInfo: ShopifyPageInfo
      }
    } | null
  }>(COLLECTION_BY_HANDLE_QUERY, {
    variables: {
      handle,
      first,
      after,
    },
  })

  if (errors) {
    throw new Error(`Shopify collection query failed: ${errors.message}`)
  }

  const collection = data?.collectionByHandle
  if (!collection) return null

  return {
    id: collection.id,
    title: collection.title,
    handle: collection.handle,
    description: collection.description,
    image: collection.image,
    products: collection.products.edges.map(mapCollectionProduct),
    pageInfo: mapPageInfo(collection.products.pageInfo),
  }
}

export async function getCollectionByHandle(handle: string): Promise<ShopifyCollection | null> {
  const firstPage = await getCollectionByHandlePage(handle)
  if (!firstPage) return null

  const products = [...firstPage.products]
  let after = firstPage.pageInfo.endCursor
  let hasNextPage = firstPage.pageInfo.hasNextPage

  while (hasNextPage) {
    const page = await getCollectionByHandlePage(handle, { after })
    if (!page) break
    products.push(...page.products)
    hasNextPage = page.pageInfo.hasNextPage
    after = page.pageInfo.endCursor
  }

  return {
    id: firstPage.id,
    title: firstPage.title,
    handle: firstPage.handle,
    description: firstPage.description,
    image: firstPage.image,
    products,
  }
}
