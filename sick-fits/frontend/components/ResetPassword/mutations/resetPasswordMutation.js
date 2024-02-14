import gql from 'graphql-tag';

const REQUEST_PASSWORD_RESET_MUTATION = gql`
  mutation REQUEST_PASSWORD_RESET_MUTATION(
    $email: String!
  ) {
    sendUserPasswordResetLink(
      email: $email
    ) {
      code
      message
    }
  }
`;

export default REQUEST_PASSWORD_RESET_MUTATION;
