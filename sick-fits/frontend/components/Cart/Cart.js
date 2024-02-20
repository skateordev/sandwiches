import styled from 'styled-components';
import formatMoney from '../../lib/formatMoney';
import useUser from '../User/User';
import { CartStyled, Supreme, CloseButton } from '../styles';
import CartItem from './CartItem';
import { useCart } from '../../lib/cartState';

const GrandTotalStyled = styled.h3`
  margin: 0;
`;

export default function Cart() {
  const currentUser = useUser();
  const currentCart = useCart();

  const { cartOpen, closeCart } = currentCart;

  if (!currentUser) return null;

  let cartTotalCost = 0;

  const cartItems = currentUser.cart.map((item) => {
    if (!item.product) return null;

    cartTotalCost += (item.product.price * item.quantity);

    return (
      <CartItem key={item.id} cartItem={item} />
    );
  });

  return (
    <CartStyled open={cartOpen}>
      <header>
        <Supreme>{currentUser.name}&apos;s cart</Supreme>
        <CloseButton type="button" onClick={closeCart}>&times;</CloseButton>
      </header>
      <ul>
        {cartItems}
      </ul>
      <footer>
        <GrandTotalStyled>Total: {formatMoney(cartTotalCost)}</GrandTotalStyled>
      </footer>
      {currentUser.email}
    </CartStyled>
  );
}
