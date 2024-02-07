import gql from "graphql-tag";

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # which variables are getting passed in? and what types are the
    # ! deliminates a required input
    $name: String!
    $image: Upload
    $price: Int!
    $description: String!
  ) {
    createProduct(
      data: {
        name: $name
        photo: {
          create: {
            image: $image
            altText: $name
          }
        }
        price: $price
        status: "AVAILABLE"
        description: $description
      }
    ) {
      id
      price
      description
    }
  }
`;