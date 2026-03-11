import "server-only"
import { getShopifyClient } from "@/packages/shopify/client"

const CART_CREATE_WITH_LINES = `
mutation cartCreate($lines: [CartLineInput!]!) {
  cartCreate(input: { lines: $lines }) {
    cart {
      id
      checkoutUrl
      totalQuantity
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 50) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price {
                  amount
                  currencyCode
                }
                product {
                  title
                  images(first: 1) {
                    edges {
                      node {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}
`

const ADD_TO_CART = `
mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      id
      checkoutUrl
      totalQuantity
    }
    userErrors {
      field
      message
    }
  }
}
`

const CART_QUERY = `
query getCart($cartId: ID!) {
  cart(id: $cartId) {
    id
    checkoutUrl
    totalQuantity
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
                currencyCode
              }
              product {
                title
                images(first: 1) {
                  edges {
                    node {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`

export interface CartLine {
  variantId: string
  quantity: number
}

export interface ShopifyCartResult {
  cartId: string
  checkoutUrl: string
  totalQuantity: number
}

/**
 * Creates a new Shopify cart with the given line items
 * and returns the cart id + hosted checkout URL.
 */
export async function createShopifyCart(lines: CartLine[]): Promise<ShopifyCartResult> {
  const client = getShopifyClient()

  const { data, errors } = await client.request<{
    cartCreate: {
      cart: {
        id: string
        checkoutUrl: string
        totalQuantity: number
      } | null
      userErrors: { field: string[]; message: string }[]
    }
  }>(CART_CREATE_WITH_LINES, {
    variables: {
      lines: lines.map((l) => ({
        merchandiseId: l.variantId,
        quantity: l.quantity,
      })),
    },
  })

  if (errors) {
    throw new Error(`Shopify cart create failed: ${errors.message}`)
  }

  const userErrors = data?.cartCreate?.userErrors
  if (userErrors?.length) {
    throw new Error(`Shopify cart error: ${userErrors.map((e) => e.message).join(", ")}`)
  }

  const cart = data?.cartCreate?.cart
  if (!cart) {
    throw new Error("Shopify cart creation returned no cart data")
  }

  return {
    cartId: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
  }
}

/**
 * Adds line items to an existing Shopify cart.
 */
export async function addLinesToShopifyCart(
  cartId: string,
  lines: CartLine[]
): Promise<ShopifyCartResult> {
  const client = getShopifyClient()

  const { data, errors } = await client.request<{
    cartLinesAdd: {
      cart: {
        id: string
        checkoutUrl: string
        totalQuantity: number
      } | null
      userErrors: { field: string[]; message: string }[]
    }
  }>(ADD_TO_CART, {
    variables: {
      cartId,
      lines: lines.map((l) => ({
        merchandiseId: l.variantId,
        quantity: l.quantity,
      })),
    },
  })

  if (errors) {
    throw new Error(`Shopify add to cart failed: ${errors.message}`)
  }

  const userErrors = data?.cartLinesAdd?.userErrors
  if (userErrors?.length) {
    throw new Error(`Shopify cart error: ${userErrors.map((e) => e.message).join(", ")}`)
  }

  const cart = data?.cartLinesAdd?.cart
  if (!cart) {
    throw new Error("Shopify add to cart returned no cart data")
  }

  return {
    cartId: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
  }
}