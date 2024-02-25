import gql from 'graphql-tag';

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION(
    $token: String!
  ) {
    checkout(token: $token) {
      id
      total
      charge
      items {
        id
        name
      }
    }
  }
`;

export default CREATE_ORDER_MUTATION;
