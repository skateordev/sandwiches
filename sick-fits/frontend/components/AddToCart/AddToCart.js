import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import ADD_TO_CART_MUTATION from './mutations/addToCartMutation';
import CURRENT_USER_QUERY from '../User/queries/currentUserQuery';
import { useCart } from '../../lib/cartState';

const AddToCartStyled = styled.button`
  &:hover {
    background-color: var(--red);
    color: var(--white);
  }
`;

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
    <AddToCartStyled
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      aria-busy={isLoading}
    >
      Add{isLoading && 'ing'} to cart 🛒
    </AddToCartStyled>
  );
}

AddToCart.propTypes = {
  id: PropTypes.string.isRequired,
};
