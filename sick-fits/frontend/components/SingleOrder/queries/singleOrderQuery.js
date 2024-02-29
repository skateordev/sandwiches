import gql from 'graphql-tag';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    Order(where: {
      id: $id
    }) {
      id
      total
      charge
      items {
        id
        name
        price
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

export default SINGLE_ORDER_QUERY;
