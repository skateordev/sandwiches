import { integer, relationship, text, virtual } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import formatMoney from '../lib/formatMoney';

export const Order = list({
  fields: {
    user: relationship({ ref: 'User.orders' }),
    items: relationship({ ref: 'OrderItem.order', many: true }),
    label: virtual({
      graphQLReturnType: 'String',
      resolver(item) {
        return `IM THE BEST ${formatMoney(item.total)}`;
      },
    }),
    total: integer(),
    charge: text(),
  },
});
