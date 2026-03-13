export const PRODUCTS_QUERY = `
query Products($first: Int!, $after: String) {
  products(first: $first, after: $after) {
    edges {
      node {
        id
        title 
        tags
        handle
        description
        images(first: 5) {
          edges {
            node {
              url
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              sku
              quantityAvailable
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
      startCursor
    }
  }
}
`

export const PRODUCT_BY_HANDLE_QUERY = `
query ProductByHandle($handle: String!) {
  productByHandle(handle: $handle) {
    id
    title
    handle
    description
    descriptionHtml
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
      pageInfo {
        hasNextPage
      }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          sku
          quantityAvailable
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
}
`

export const COLLECTIONS_QUERY = `
query Collections {
  collections(first: 20) {
    edges {
      node {
        id
        title
        handle
        description
        image {
          url
          altText
          width
          height
        }
        products(first: 4) {
          edges {
            node {
              id
              title
              handle
              description
              images(first: 5) {
                edges {
                  node {
                    url
                  }
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    sku
                    quantityAvailable
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
      startCursor
    }
  }
}
`

export const COLLECTION_BY_HANDLE_QUERY = `
query CollectionByHandle($handle: String!, $first: Int!, $after: String) {
  collectionByHandle(handle: $handle) {
    id
    title
    handle
    description
    image {
      url
      altText
    }
    products(first: $first, after: $after) {
      edges {
        node {
          id
          title
          handle
          description
          images(first: 5) {
            edges {
              node {
                url
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                sku
                quantityAvailable
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
`
