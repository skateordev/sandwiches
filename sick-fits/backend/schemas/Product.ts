import { integer, relationship, select, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { isSignedIn, rules } from '../access';

export const Product = list({
  access: {
    create: isSignedIn,
    read: rules.canReadProducts,
    update: rules.canManageProducts,
    delete: rules.canManageProducts,
  },
  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    photo: relationship({
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineEdit: { fields: ['image', 'altText'] },
        inlineCreate: { fields: ['image', 'altText'] },
      },
      ref: 'ProductImage.product',
    }),
    status: select({
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'hidden' },
      },
      options: [
        { label: 'Draft', value: 'DRAFT' },
        { label: 'Available', value: 'AVAIALABLE' },
        { label: 'Unavailable', value: 'UNAVAILABLE' },
      ],
      defaultValue: 'DRAFT',
    }),
    price: integer(),
    user: relationship({
      ref: 'User.products',
      defaultValue: ({ context }) => ({
        connect: { id: context.session.itemId },
      }),
    }),
    // TODO: photo
  },
});
