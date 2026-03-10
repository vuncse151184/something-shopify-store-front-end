export const CART_CREATE = `
mutation cartCreate {
  cartCreate {
    cart {
      id
      checkoutUrl
    }
  }
}
`

export const ADD_TO_CART = `
mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      id
      checkoutUrl
    }
  }
}
`