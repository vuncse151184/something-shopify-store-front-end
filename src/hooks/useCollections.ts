"use client"

import { useQuery } from "@tanstack/react-query"
import type { ShopifyProduct } from "@/types/product"

interface Collection {
  id: string
  title: string
  handle: string
  description: string
  image: { url: string; altText: string | null } | null
  products: ShopifyProduct[]
}

export function useCollections() {
  return useQuery({
    queryKey: ["collections"],
    queryFn: async (): Promise<Collection[]> => {
      const response = await fetch("/api/collections")
      if (!response.ok) throw new Error("Failed to fetch collections")
      return response.json()
    },
  })
}

export function useCollection(handle: string) {
  return useQuery({
    queryKey: ["collection", handle],
    queryFn: async (): Promise<Collection> => {
      const response = await fetch(`/api/collections/${handle}`)
      if (!response.ok) throw new Error("Failed to fetch collection")
      return response.json()
    },
    enabled: !!handle,
  })
}
