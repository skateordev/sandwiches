import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import ADD_TO_CART_MUTATION from './mutations/addToCartMutation';
import CURRENT_USER_QUERY from '../User/queries/currentUserQuery';

export default function AddToCart({ id }) {
  const [addToCart, { loading: isLoading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { productId: id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <button
      type="button"
      onClick={addToCart}
      disabled={isLoading}
      aria-busy={isLoading}
    >
      Add{isLoading && 'ing'} to cart 🛒
    </button>
  );
}

AddToCart.propTypes = {
  id: PropTypes.string.isRequired,
};
