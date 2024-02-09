import gql from 'graphql-tag';

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
      price
      description
    }
  }
`;

export default ALL_PRODUCTS_QUERY;
