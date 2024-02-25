import { KeystoneContext } from '@keystone-next/types';
import {
  OrderCreateInput,
  CartItemCreateInput,
} from '../.keystone/schema-types';
import stripeConfig from '../lib/stripe';

// 'fake' gql syntax highlighting for template literals
const graphql = String.raw;

interface Arguments {
  token: string;
}

// takes in a token and spits out an order
async function checkout(
  root: any,
  { token }: Arguments, // second arg is arguments. token is destructured from there
  context: KeystoneContext
): Promise<OrderCreateInput> {
  // 1. make sure they are signed in
  const userId = context.session.itemId;

  if (!userId) {
    throw new Error('Sarry. YTou must do signing in for to creat a order');
  }

  // 1.5 query the current user
  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: graphql`
      id
      name
      email
      cart {
        id
        quantity
        product {
          id
          name
          price
          description
          photo {
            id
            image {
              id
              publicUrlTransformed
            }
          }
        }
      }
    `,
  });

  // spit out a large object without truncating
  console.dir(user, { depth: null });

  // 2. calculate the total price for their order
  const cartItems = user.cart.filter((cartItem) => cartItem.product);

  const amount = cartItems.reduce(function (tally: number, cartItem: CartItemCreateInput) {
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
  console.log({ amount });

  // 3. create payment with stripe lib
  const charge = await stripeConfig.paymentIntents.create({
    amount,
    confirm: true,
    currency: 'eur',
    payment_method: token,
  })
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });

  console.log(charge);
  // 4. conver the CartItems to OrderItems
  // 5. create the Order and return it (save in the db)
}

export default checkout;
