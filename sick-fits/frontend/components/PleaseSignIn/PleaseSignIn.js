import PropTypes from 'prop-types';
import SignIn from '../SignIn/SignIn';
import useUser from '../User/User';

export default function PleaseSignIn({ children }) {
  const me = useUser();
  // if not logged in, show signin page
  if (!me) return <SignIn />;

  return children;
}

PleaseSignIn.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.object.isRequired,
};
