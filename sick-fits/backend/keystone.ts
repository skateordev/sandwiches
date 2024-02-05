import 'dotenv/config';
import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { User } from './schemas/User';

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
      // TODO: add data seeding here
    },
    lists: createSchema({
      // TODO: schema items go here
      User,
    }),
    ui: {
      // TODO: change this for roles
      isAccessAllowed: () => true,
    },
    // TODO: add session values here
  })
);
