import 'dotenv/config';
import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { Role } from './schemas/Role';
import { User } from './schemas/User';
import { Order } from './schemas/Order';
import { Product } from './schemas/Product';
import { CartItem } from './schemas/CartItem';
import { OrderItem } from './schemas/OrderItem';
import { ProductImage } from './schemas/ProductImage';
import { insertSeedData } from './seed-data';
import { permissionsList } from './schemas/fields';
import { extendGraphqlSchema } from './mutations';
import { sendPasswordResetEmail } from './lib/mail';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // s * m * h * d = how long to stay signed in
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  secretField: 'password',
  identityField: 'email',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO: add initial roles here
  },
  passwordResetLink: {
    async sendToken(args) {
      console.log(args);
      // send the pw reset email
      await sendPasswordResetEmail(args.token, args.identity);
    },
  },
});

export default withAuth(
  config({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    server: {
      port: 3333,
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      async onConnect(keystone) {
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      },
    },
    extendGraphqlSchema,
    lists: createSchema({
      // Schema items go here
      Role,
      User,
      Order,
      Product,
      CartItem,
      OrderItem,
      ProductImage,
    }),
    ui: {
      // TODO: change this for roles
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      isAccessAllowed: ({ session }) => !!session?.data,
    },
    // TODO: add session values here
    session: withItemData(statelessSessions(sessionConfig), {
      // GraphQL query
      User: `id name email role { ${permissionsList.join(' ')} }`,
    }),
  })
);
