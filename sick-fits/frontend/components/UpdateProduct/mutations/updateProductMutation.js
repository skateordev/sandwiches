import gql from 'graphql-tag';

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $price: Int
    # $image: Upload
    $description: String
  ) {
    updateProduct(
      id: $id
      data: {
        name: $name
        price: $price
        # TODO: add support for updating product photos
        # photo: {
        #   create: {
        #     image: $image
        #     altText: $name
        #   }
        # }
        description: $description
      }
    ) {
      id
      name
      price
      # photo {
      #   image { publicUrlTransformed }
      #   altText
      # }
      description
    }
  }
`;

export default UPDATE_PRODUCT_MUTATION;
