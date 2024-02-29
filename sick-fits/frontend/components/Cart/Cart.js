import styled from 'styled-components';
import formatMoney from '../../lib/formatMoney';
import useUser from '../User/User';
import { CartStyled, Supreme, CloseButton } from '../styles';
import CartItem from './CartItem';
import { useCart } from '../../lib/cartState';
import Checkout from '../Checkout/Checkout';

const FooterStyled = styled.footer`
  overflow: hidden;

  p {
    font-size: 1rem;
    font-weight: 300;
    padding-top: 16px;
  }
`;

const GrandTotalStyled = styled.h3`
  margin: 0;
  animation: 5s linear 5s 1 stonkStart, 30s linear 10s infinite stonkTicker;

  @keyframes stonkStart {
    100% {
      transform: translate(-200%);
    }
  }

  @keyframes stonkTicker {
    0% {
      transform: translate(200%);
    }

    100% {
      transform: translate(-200%);
    }
  }
`;

const GrandTotalOffsetStyled = styled.h3`
  margin: 0;
  animation: 30s linear 25s infinite stonkTickerOffset;
  visibility: hidden;

  @keyframes stonkTickerOffset {
    0% {
      visibility: visible;
      transform: translate(100%);
    }

    100% {
      transform: translate(-300%);
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
        <div className="ticker">
          <GrandTotalStyled>Total: {formatMoney(cartTotalCost)}</GrandTotalStyled>
          <GrandTotalOffsetStyled>Total: {formatMoney(cartTotalCost)}</GrandTotalOffsetStyled>
        </div>
        <Checkout />
        <p>
          {currentUser.email}
        </p>
      </FooterStyled>
    </CartStyled>
  );
}
