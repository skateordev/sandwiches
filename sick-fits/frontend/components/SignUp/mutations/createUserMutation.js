import gql from 'graphql-tag';

const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION(
    $name: String!,
    $email: String!,
    $password: String!
  ) {
    createUser(
      data: {
        name: $name
        email: $email
        password: $password
    }) {
      id
      name
      email
    }
  }
`;

export default CREATE_USER_MUTATION;
