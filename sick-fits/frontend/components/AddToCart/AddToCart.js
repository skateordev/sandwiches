import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import ADD_TO_CART_MUTATION from './mutations/addToCartMutation';
import CURRENT_USER_QUERY from '../User/queries/currentUserQuery';
import { useCart } from '../../lib/cartState';

export default function AddToCart({ id }) {
  const [addToCart, { loading: isLoading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { productId: id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const { openCart } = useCart();

  const handleClick = () => {
    openCart();
    addToCart();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
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
