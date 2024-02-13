import { gql } from '@apollo/client';

const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      # because it returns a union, authenticatedItem could be multiple things
      # we want to get this data when it returns type User
      ... on User {
        id
        name
        email
        # TODO: Query the cart once we have it
      }
    }
  }
`;

export default CURRENT_USER_QUERY;
