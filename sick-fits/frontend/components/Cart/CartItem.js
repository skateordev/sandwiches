import PropTypes from 'prop-types';
import styled from 'styled-components';
import formatMoney from '../../lib/formatMoney';

const CartItemStyled = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;

  img {
    margin-right: 6rem;
  }

  p {
    margin: 0;
  }

  h3 {
    margin: 0 0 0.5rem;
  }
`;

export default function CartItem({ cartItem }) {
  const { product } = cartItem;

  return (
    <CartItemStyled key={cartItem.id}>
      <img
        src={product.photo.image.publicUrlTransformed}
        alt={product.photo.altText}
        width="100"
      />
      <div>
        <h3>{product.name}</h3>
        <p>Price: {formatMoney(product.price)}</p>
        <p>Quantity: x{cartItem.quantity}</p>
        -------------------------
        <p className="sub-total">Product total: {formatMoney(cartItem.quantity * product.price)}</p>
      </div>
    </CartItemStyled>
  );
}

CartItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  cartItem: PropTypes.object.isRequired,
};
