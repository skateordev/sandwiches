import gql from 'graphql-tag';

const PRODUCTS_PAGINATION_QUERY = gql`
  query PRODUCTS_PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default PRODUCTS_PAGINATION_QUERY;
