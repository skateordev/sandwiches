import styled from 'styled-components';
import formatMoney from '../../lib/formatMoney';
import useUser from '../User/User';
import { CartStyled, Supreme } from '../styles';
import CartItem from './CartItem';

const GrandTotalStyled = styled.h3`
  margin: 0;
`;

export default function Cart() {
  const currentUser = useUser();
  console.log(currentUser);

  if (!currentUser) return null;

  let cartTotalCost = 0;

  const cartItems = currentUser.cart.map((item) => {
    if (!item.product) return null;

    cartTotalCost += (item.product.price * item.quantity);

    return (
      <CartItem cartItem={item} />
    );
  });

  return (
    <CartStyled open>
      <header>
        <Supreme>{currentUser.name}&apos;s cart</Supreme>
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
