import PropTypes from 'prop-types';
import { UpdateProduct } from '../components';

export default function UpdateProductPage({ query }) {
  const { id: productId } = query;

  return <UpdateProduct id={productId} />;
}

UpdateProductPage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};
