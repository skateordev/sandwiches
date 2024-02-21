import styled from 'styled-components';
import formatMoney from '../../lib/formatMoney';
import useUser from '../User/User';
import { CartStyled, Supreme, CloseButton } from '../styles';
import CartItem from './CartItem';
import { useCart } from '../../lib/cartState';
import Checkout from '../Checkout/Checkout';

const FooterStyled = styled.footer`
  overflow: hidden;
`;

const GrandTotalStyled = styled.h3`
  margin: 0;
  animation: 30s linear 0s infinite stonkTicker;

  @keyframes stonkTicker {
    0% {
      transform: translate(200%);
    }

    100% {
      transform: translate(-200%)
    }
  }
`;

const GrandTotalStyled2 = styled.h3`
  margin: 0;
  animation: 30s linear 15s infinite stonkTicker2;

  @keyframes stonkTicker2 {
    0% {
      transform: translate(100%);
    }

    100% {
      transform: translate(-300%)
    }
  }
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
      <FooterStyled>
        <GrandTotalStyled>Total: {formatMoney(cartTotalCost)}</GrandTotalStyled>
        <GrandTotalStyled2>Total: {formatMoney(cartTotalCost)}</GrandTotalStyled2>
      </FooterStyled>
      <Checkout />
      {currentUser.email}
    </CartStyled>
  );
}
