import { permissionsList } from "./schemas/fields";
import { ListAccessArgs } from "./types";

/* at its simplest, access control is either YES or NO,
   depending on the user's session */
function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

/* generate permission functions from the list we
   exported in fields.ts */
const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ],
  ));

// Permissions check if someone meets a criteria: yes | no
const permissions = {
  ...generatedPermissions,
  // example of adding a custom perm:
  isAwesome({ session }: ListAccessArgs) {
    return session?.data.name.includes('sicko');
  },
};

/* Rules based function
   rules can return a boolean or a filter which
   limits which products they can CRUD */
const rules = {
  canReadProducts({ session }: ListAccessArgs) {
    // 1. Perms check for canReadProducts
    if (permissions.canReadProducts({ session })) {
      return true; // they can read all the things!
    }

    /* they should only see available products (based on the
       product status field) */
    return { status: 'AVAILABLE' }
  },
  canManageProducts({ session }: ListAccessArgs) {
    // Are they signed in?
    if (!isSignedIn({ session })) {
      return false;
    }

    // 1. do they have the canMenageProducts permission?
    if (permissions.canManageProducts({ session })) {
      return true;
    }

    // 2. otherwise, do they OWN the item (did they create it)?
    return { user: { id: session.itemId } };
  },
  canOrder({ session }: ListAccessArgs) {
    // Are they signed in?
    if (!isSignedIn({ session })) {
      return false;
    }

    // Do they have permission of canManageCart
    if (permissions.canManageCart({ session })) {
      return true;
    }

    // 2. otherwise, do they OWN the item (did they create it)?
    return { user: { id: session.itemId } }
  },
  canManageOrderItems({ session }: ListAccessArgs) {
    // Are they signed in?
    if (!isSignedIn({ session })) {
      return false;
    }

    // Do they have permission of canManageCart
    if (permissions.canManageCart({ session })) {
      return true;
    }

    // 2. otherwise, do they OWN the item (did they create it)?
    return { order: { user: { id: session.itemId } } }
  },
};

export {
  rules,
  isSignedIn,
  permissions,
};
