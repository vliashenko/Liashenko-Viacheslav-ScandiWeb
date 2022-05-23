import { gql } from "@apollo/client"
import { client } from '..';

function FetchCategory(category) {
   return client.query({
    query:gql`
    query {
      category(input: { title: "${category}" }) {
        name
        products {
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
  }).then(res => {
    return res.data.category
  })
}
export default FetchCategory