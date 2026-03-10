export const PRODUCTS_QUERY = `
query Products {
  products(first:20) {
    edges {
      node {
        id
        title
        handle
        description
        images(first:5){
          edges{
            node{
              url
            }
          }
        }
        variants(first:10){
          edges{
            node{
              id
              title
              sku
              quantityAvailable
              price{
                amount
                currencyCode
              }
              compareAtPrice{
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
`