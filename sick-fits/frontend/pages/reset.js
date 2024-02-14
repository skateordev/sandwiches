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
      <p>Rese&apos; yawn passward</p>
      <ResetPassword token={query?.token} />
    </div>
  );
}

ResetPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  query: PropTypes.object.isRequired,
};
