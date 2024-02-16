import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';

const graphql = String.raw;

export const extendGraphQlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      addToCart(productID: ID): CartItem
    }
  `,
  resolvers: {
    Mutation: {
      addToCart() {
        // custom code goes here
        console.log('Adds to cart!!');
      },
    },
  },
});
