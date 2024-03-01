import { integer, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { isSignedIn, rules } from '../access';

export const CartItem = list({
  access: {
    create: isSignedIn,
    read: rules.canOrder,
    update: rules.canOrder,
    delete: rules.canOrder,
  },
  ui: {
    listView: {
      initialColumns: ['user', 'product', 'quantity'],
    },
  },
  fields: {
    // TODO: add custom label
    quantity: integer({
      isRequired: true,
      defaultValue: 1,
    }),
    // create a 2-way relationship between cart item and user:
    user: relationship({ ref: 'User.cart' }),
    product: relationship({ ref: 'Product' }),
  },
});
