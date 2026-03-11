import "server-only"
import { getShopifyClient } from "@/packages/shopify/client"
import { COLLECTIONS_QUERY, COLLECTION_BY_HANDLE_QUERY } from "@/packages/shopify/queries"
import type { ShopifyProduct, ShopifyProductEdge } from "@/types/product"

export interface ShopifyCollection {
  id: string
  title: string
  handle: string
  description: string
  image: { url: string; altText: string | null } | null
  products: ShopifyProduct[]
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

export async function getCollectionByHandle(handle: string): Promise<ShopifyCollection | null> {
  const client = getShopifyClient()
  const { data, errors } = await client.request<{
    collectionByHandle: {
      id: string
      title: string
      handle: string
      description: string
      image: { url: string; altText: string | null } | null
      products: { edges: ShopifyProductEdge[] }
    } | null
  }>(COLLECTION_BY_HANDLE_QUERY, { variables: { handle } })

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
    products: collection.products.edges.map((edge) => ({
      id: edge.node.id,
      title: edge.node.title,
      handle: edge.node.handle,
      description: edge.node.description,
      images: edge.node.images.edges.map((img) => img.node),
      variants: edge.node.variants.edges.map((v) => v.node),
    })),
  }
}
