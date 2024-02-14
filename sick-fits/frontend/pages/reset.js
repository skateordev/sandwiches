import PropTypes from 'prop-types';
import { ResetPassword, RequestPasswordReset } from '../components/ResetPassword';

export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <div>
        <p> Sarry, you gotta do putting a toeken</p>
        <RequestPasswordReset />
      </div>
    );
  }

  return (
    <div>
      <p>Reset yawn pashvert {query.token}</p>
      <ResetPassword />
    </div>
  );
}

ResetPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  query: PropTypes.object.isRequired,
};
