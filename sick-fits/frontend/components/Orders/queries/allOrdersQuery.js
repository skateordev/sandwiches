import gql from 'graphql-tag';

const ALL_ORDERS_QUERY = gql`
  query ALL_ORDERS_QUERY(
    $skip: Int = 0
    $first: Int
  ) {
  allOrders(
    skip: $skip
    first: $first
    sortBy: id_ASC
  ) {
    id
    total
    charge
    user {
      id
      email
    }
    items {
      id
      name
      quantity
      description
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
}
`;

export default ALL_ORDERS_QUERY;
