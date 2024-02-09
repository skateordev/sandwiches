import PropTypes from 'prop-types';
import { SingleProduct } from '../../components';

export default function SingleProductPage({ query }) {
  const { id: productId } = query;

  return <SingleProduct id={productId} />;
}

SingleProductPage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};
