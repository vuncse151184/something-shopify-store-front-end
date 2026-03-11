export interface ShopifyImage {
  url: string
}

export interface ShopifyPrice {
  amount: string
  currencyCode: string
}

export interface ShopifyVariant {
  id: string
  title: string
  sku: string
  quantityAvailable: number
  price: ShopifyPrice
  compareAtPrice: ShopifyPrice | null
}

export interface ShopifyProduct {
  id: string
  title: string
  handle: string
  tags?: string[]
  description: string
  images: ShopifyImage[]
  variants: ShopifyVariant[]
}

/**
 * Raw Shopify Storefront API response shape (before flattening edges/nodes)
 */
export interface ShopifyProductEdge {
  node: {
    id: string
    title: string
    tags?: string[]
    handle: string
    description: string
    images: {
      edges: { node: ShopifyImage }[]
    }
    variants: {
      edges: {
        node: {
          id: string
          title: string
          sku: string
          quantityAvailable: number
          price: ShopifyPrice
          compareAtPrice: ShopifyPrice | null
        }
      }[]
    }
  }
}
