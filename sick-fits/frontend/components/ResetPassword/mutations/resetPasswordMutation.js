import gql from 'graphql-tag';

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $email: String!,
    $token: String!,
    $password: String!,
  ){
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
        code
        message
    }
  }
`;

export default RESET_PASSWORD_MUTATION;
