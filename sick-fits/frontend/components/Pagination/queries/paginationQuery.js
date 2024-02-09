import gql from 'graphql-tag';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default PAGINATION_QUERY;
