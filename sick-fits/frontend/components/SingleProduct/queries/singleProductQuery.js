import gql from 'graphql-tag'

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      photo {
        image { publicUrlTransformed }
        altText
      }
      price
      description
    }
  }
`;
