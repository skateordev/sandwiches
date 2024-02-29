import PropTypes from 'prop-types';
import { SingleOrder } from '../../components';

export default function SingleOrderPage({ query }) {
  const { id: orderId } = query;

  return <SingleOrder id={orderId} />;
}

SingleOrderPage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};
