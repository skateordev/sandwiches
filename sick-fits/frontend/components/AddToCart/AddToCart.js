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

export default function AddToCart({ productId }) {
  const [addToCart, { loading: isLoading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { productId },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const { openCart } = useCart();

  const handleClick = () => {
    // console.log(addToCart());
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
  productId: PropTypes.string.isRequired,
};
