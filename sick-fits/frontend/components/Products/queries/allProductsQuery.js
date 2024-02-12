import gql from 'graphql-tag';

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY(
    $skip: Int = 0, # represents how many products per page aka how many to "skip" when paging
    $first: Int # what defines the first "batch"
  ) {
    allProducts(
      skip: $skip
      first: $first
    ) {
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
