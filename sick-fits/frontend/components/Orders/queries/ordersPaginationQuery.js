import gql from 'graphql-tag';

const ORDERS_PAGINATION_QUERY = gql`
  query ORDERS_PAGINATION_QUERY {
    _allOrdersMeta {
      count
    }
  }
`;

export default ORDERS_PAGINATION_QUERY;
