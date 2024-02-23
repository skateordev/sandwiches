import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import styled from 'styled-components';
import { useState } from 'react';
import nProgress from 'nprogress';
import { SickButton } from '../styles';

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
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (evt) => {
    // 1. stop the form from submitting and turn the loader on
    evt.preventDefault();

    console.log('tings to gdo still!');

    // 2. start the page transition
    nProgress.start();

    // 3. create the payment method via stripe (toked comes back here if successful)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    // 4. handle any error afrom stripe
    // 5. send the token from step 3 to our keystone server, via a custom mutation!
    // 6. chage the page to view the order
    // 7. close the cart
    // 8. turn the loader off
  };

  return (
    <CheckoutFormStyled onSubmit={handleSubmit}>
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
