import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import checkout from './checkout';
import addToCart from './addToCart';

// fake some syntax highlighting for inside template literal
const graphql = String.raw;

export const extendGraphqlSchema = graphQLSchemaExtension({
  /* what is the name of the method, what does it take in
  and what does it return */
  typeDefs: graphql`
    type Mutation {
      checkout(token: String!): Order
      addToCart(productId: ID): CartItem
    }
  `,
  /* resolvers are links to nodejs functions that
     will run when requested upon via graphql api */
  resolvers: {
    Mutation: {
      checkout,
      addToCart,
    },
  },
});
