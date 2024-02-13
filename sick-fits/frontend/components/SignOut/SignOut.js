import { useMutation } from '@apollo/client';
import SIGN_OUT_MUTATION from './mutations/signOutMutation';
import CURRENT_USER_QUERY from '../User/queries/currentUserQuery';

export default function SignOut() {
  const [signOutMutation] = useMutation(
    SIGN_OUT_MUTATION,
    {
      variables: {
        endSession: true,
      },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    },
  );

  return (
    <button type="button" onClick={signOutMutation}>Sashay Away 💃</button>
  );
}
