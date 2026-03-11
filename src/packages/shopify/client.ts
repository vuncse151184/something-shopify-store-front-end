import "server-only"
import { createStorefrontApiClient } from "@shopify/storefront-api-client"

function getRequiredEnv(name: string, legacyName?: string) {
  const value = process.env[name]

  if (value) {
    return value
  }

  const legacyValue = legacyName ? process.env[legacyName] : undefined

  if (legacyValue) {
    console.warn(`Using legacy Shopify env "${legacyName}". Rename it to "${name}" for server-side use.`)
    return legacyValue
  }

  const keys = legacyName ? `${name} or ${legacyName}` : name
  throw new Error(`Missing Shopify environment variable: ${keys}`)
}

function getStorefrontTokenConfig() {
  const privateToken = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN
  const publicToken = process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN

  if (privateToken && publicToken) {
    throw new Error(
      "Provide only one Shopify Storefront token: SHOPIFY_STOREFRONT_PRIVATE_TOKEN or SHOPIFY_STOREFRONT_PUBLIC_TOKEN.",
    )
  }

  if (privateToken) {
    return { privateAccessToken: privateToken }
  }

  if (publicToken) {
    return { publicAccessToken: publicToken }
  }

  const legacyToken = process.env.SHOPIFY_STOREFRONT_TOKEN
  if (legacyToken) {
    console.warn(
      'Using legacy Shopify env "SHOPIFY_STOREFRONT_TOKEN". Rename it to SHOPIFY_STOREFRONT_PRIVATE_TOKEN or SHOPIFY_STOREFRONT_PUBLIC_TOKEN.',
    )
    return legacyToken.startsWith("shpss_")
      ? { privateAccessToken: legacyToken }
      : { publicAccessToken: legacyToken }
  }

  const legacyPublicToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN
  if (legacyPublicToken) {
    if (legacyPublicToken.startsWith("shpss_")) {
      console.warn(
        'NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN looks like a private Storefront token. Move it to SHOPIFY_STOREFRONT_PRIVATE_TOKEN so it is not exposed to the browser.',
      )
      return { privateAccessToken: legacyPublicToken }
    }

    console.warn(
      'Using legacy Shopify env "NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN". Rename it to SHOPIFY_STOREFRONT_PUBLIC_TOKEN for server-side use.',
    )
    return { publicAccessToken: legacyPublicToken }
  }

  throw new Error(
    "Missing Shopify Storefront token. Set SHOPIFY_STOREFRONT_PRIVATE_TOKEN or SHOPIFY_STOREFRONT_PUBLIC_TOKEN.",
  )
}

export function getShopifyClient() {
  return createStorefrontApiClient({
    storeDomain: getRequiredEnv("SHOPIFY_STORE_DOMAIN", "NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN"),
    apiVersion: "2026-01",
    ...getStorefrontTokenConfig(),
  })
}
