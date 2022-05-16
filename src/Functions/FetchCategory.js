import { gql } from "@apollo/client"
import { client } from '..';

function FetchCategory() {
   return client.query({
    query:gql`
    query {
        categories {
        name,
           products{
            id
            name
            brand
            gallery
            inStock
            description
            attributes{
              type
              name
              items{
                value
              }
            }
            prices{
              currency{
                symbol
                label
              }
              amount
            }
          }
        }
      }
    `
  })
}
export default FetchCategory