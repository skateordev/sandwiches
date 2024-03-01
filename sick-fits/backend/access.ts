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
  canManageProducts({ session }: ListAccessArgs) {
    // 1. do they have the canMenageProducts permission?
    if (permissions.canManageProducts({ session })) {
      return true;
    }

    // 2. do they OWN the item?
    return { user: { id: session.itemId } };
  }
};

export {
  rules,
  isSignedIn,
  permissions,
};
