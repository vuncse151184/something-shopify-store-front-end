import type { ShopifyPageInfo, ShopifyProduct } from "./product"

export interface ShopifyCollection {
  id: string
  title: string
  handle: string
  description: string
  image: { url: string; altText: string | null } | null
  products: ShopifyProduct[]
}

export interface ShopifyCollectionPage extends ShopifyCollection {
  pageInfo: ShopifyPageInfo
}
