import Stripe from 'stripe';

// export config for convenience and limit the number of times
// this needs to be declared when needed
const stripeConfig = new Stripe(process.env.STRIPE_SECRET || '', {
  apiVersion: '2020-08-27',
});

export default stripeConfig;
