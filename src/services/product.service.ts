import "server-only"
import { getShopifyClient } from "@/packages/shopify/client"
import { PRODUCTS_QUERY } from "@/packages/shopify/queries"
import type { ShopifyProduct, ShopifyProductEdge } from "@/types/product"

export async function getProducts(): Promise<ShopifyProduct[]> {
  const shopifyClient = getShopifyClient()
  const { data } = await shopifyClient.request(PRODUCTS_QUERY)

  return data.products.edges.map((edge: ShopifyProductEdge) => ({
    id: edge.node.id,
    title: edge.node.title,
    handle: edge.node.handle,
    description: edge.node.description,
    images: edge.node.images.edges.map((img: { node: { url: string } }) => img.node),
    variants: edge.node.variants.edges.map((v: { node: ShopifyProduct["variants"][number] }) => v.node),
  }))
}
