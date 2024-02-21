import gql from 'graphql-tag';

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY(
    # $skip: represents the total number of items to "skip" when paging
    # $first: return the first n items after skip where n = ITEMS_PER_PAGE
    #
    # example: if we want 4 items per page and go to page 3
    #   skip = 8 "skip pages 1 and 2 that contain the first 8 items"
    #   first = 4 "of the remaining items, give me the first 4"
    #
    #   result: items 9, 10, 11 and 12

    $skip: Int = 0,
    $first: Int
  ) {
    allProducts(
      skip: $skip
      first: $first
      sortBy: id_DESC
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
