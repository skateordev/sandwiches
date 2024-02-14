import { text, password, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const User = list({
  // access:
  // ui:
  fields: {
    name: text({ isRequired: true }),
    cart: relationship({
      ui: {
        itemView: { fieldMode: 'read' },
        createView: { fieldMode: 'hidden' },
      },
      ref: 'CartItem.user', // 2-way relationship connection
      many: true, // can have multiple items in cart
    }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    // TODO: add roles, carts and orders
  },
});
