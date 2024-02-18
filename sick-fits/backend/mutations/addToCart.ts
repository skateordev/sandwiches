import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';

async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  console.log('¡Adding into cart!');

  // 1. Query the current user -- are the signed in?
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error('You gotta log in to do that!');
  }

  // 2. Query the current user's cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
    resolveFields: 'id,quantity',
  });

  // destructure first item from allCartItems into existingCartItem
  const [existingCartItem] = allCartItems;

  // 3. See if the current item is in their cart
  /* eslint-disable */
  if (existingCartItem) {
    console.log({ existingCartItem });
    console.log(`There's already ${existingCartItem.quantity}, adding 1 moar!`);
    // 4a. If it is, increment by 1 (or number specified, if we do that)

    return context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
      resolveFields: false,
    });
  }

  // 4b. If it isn't, create a new cart item
  return context.lists.CartItem.createOne({
    data: {
      user: { connect: { id: sesh.itemId } },
      product: { connect: { id: productId } },
    },
    resolveFields: false,
  });
  /* eslint-enable */
}

export default addToCart;
