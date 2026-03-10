import "server-only"
import { createStorefrontApiClient } from "@shopify/storefront-api-client"

function getRequiredEnv(name: string, fallbackName?: string) {
  const value = process.env[name] ?? (fallbackName ? process.env[fallbackName] : undefined)

  if (!value) {
    const keys = fallbackName ? `${name} or ${fallbackName}` : name
    throw new Error(`Missing Shopify environment variable: ${keys}`)
  }

  return value
}

export function getShopifyClient() {
  return createStorefrontApiClient({
    storeDomain: getRequiredEnv("SHOPIFY_STORE_DOMAIN", "NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN"),
    apiVersion: "2026-01",
    publicAccessToken: getRequiredEnv(
      "SHOPIFY_STOREFRONT_TOKEN",
      "NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN",
    ),
  })
}
