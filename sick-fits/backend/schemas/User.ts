import { text, password, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { permissions, rules } from '../access';

export const User = list({
  access: {
    create: () => true,
    read: rules.canManageUsers,
    update: rules.canManageUsers,
    // only people with the PERMISSION can delete themselves
    // you can't delete yourself .....?
    delete: permissions.canManageUsers,
  },
  ui: {
    // hide the backend UI for mere plebian users
    hideCreate: (args) => permissions.canManageUsers(args),
    hideDelete: (args) => permissions.canManageUsers(args),
  },
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    orders: relationship({ ref: 'Order.user', many: true }),
    password: password(),
    cart: relationship({
      ui: {
        itemView: { fieldMode: 'read' },
        createView: { fieldMode: 'hidden' },
      },
      ref: 'CartItem.user', // 2-way relationship connection
      many: true, // can have multiple items in cart
    }),
    role: relationship({
      ref: 'Role.assignedTo',
      access: {
        create: permissions.canManageUsers,
        update: permissions.canManageUsers,
      },
    }),
    products: relationship({
      ref: 'Product.user',
      many: true,
    }),
  },
});
