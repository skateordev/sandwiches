import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import REMOVE_FROM_CART_MUTATION from './mutations/removeFromCartMutation';
import CURRENT_USER_QUERY from '../User/queries/currentUserQuery';

const RemoveFromCartStyled = styled.button`
  color: var(--white);
  border: 0;
  height: 2rem;
  transform: skew(-3deg);
  background: var(--red);
  padding: 0 0.5rem;
  margin-right: 1rem;
`;

export default function RemoveFromCart({ id }) {
  const [removeFromCart, { loading: isLoading }] = useMutation(
    REMOVE_FROM_CART_MUTATION,
    {
      variables: {
        id,
      },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    },
  );

  return (
    <RemoveFromCartStyled
      type="button"
      onClick={removeFromCart}
      disabled={isLoading}
      aria-busy={isLoading}
    >
      🗑️ ELIMIN8
    </RemoveFromCartStyled>
  );
}

RemoveFromCart.propTypes = {
  id: PropTypes.string.isRequired,
};
