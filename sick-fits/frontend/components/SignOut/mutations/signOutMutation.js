import gql from 'graphql-tag';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    # standalone mutations that takes no arguments
    endSession
  }
`;

export default SIGN_OUT_MUTATION;
