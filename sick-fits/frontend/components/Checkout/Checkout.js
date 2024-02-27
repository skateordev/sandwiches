import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import styled from 'styled-components';
import { useState } from 'react';
import nProgress from 'nprogress';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { SickButton } from '../styles';
import CREATE_ORDER_MUTATION from './mutations/createOrderMutation';
import { useCart } from '../../lib/cartState';
import CURRENT_USER_QUERY from '../User/queries/currentUserQuery';

const CheckoutFormStyled = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0,0,0,0.04);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const closeCart = useCart();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [checkout, { error: graphQLError }] = useMutation(CREATE_ORDER_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleSubmit = async (evt) => {
    // 1. stop the form from submitting and turn the loader on
    evt.preventDefault();
    setIsLoading(true);

    // 2. start the page transition
    nProgress.start();

    // 3. create the payment method via stripe (toked comes back here if successful)
    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    console.log(paymentMethod);

    // 4. handle any error from stripe
    if (stripeError) {
      setError(stripeError);
      nProgress.done();
      return; // stop the checkout from happening
    }

    // 5. send the token from step 3 to our keystone server, via a custom mutation!
    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    });

    console.log('Order cumplete💦');
    console.log(order);

    // 6. chage the page to view the order
    router.push({
      pathname: '/order/[id]',
      query: { id: order.data.checkout.id },
    });

    // 7. close the cart
    closeCart();

    // 8. turn the loader off
    setIsLoading(false);
    nProgress.done();
  };

  return (
    <CheckoutFormStyled onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: '0.75rem' }}>{error.message}</p>}
      {error && <p style={{ fontSize: '0.75rem' }}>{graphQLError?.message}</p>}
      <CardElement />
      <SickButton>TAKE MY MONEY</SickButton>
    </CheckoutFormStyled>
  );
}

function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}

export default Checkout;
