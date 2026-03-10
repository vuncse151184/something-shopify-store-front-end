import { shopifyClient } from "@/packages/shopify/client"
import { PRODUCTS_QUERY } from "@/packages/shopify/queries"

export async function getProducts() {
  const { data } = await shopifyClient.request(PRODUCTS_QUERY)

  return data.products.edges.map((p: any) => p.node)
}