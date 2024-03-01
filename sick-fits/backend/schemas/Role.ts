import { list } from "@keystone-next/keystone/schema";
import { relationship, text } from "@keystone-next/fields";
import { permissionFields } from "./fields";

/* the order of the fields here matters!
   changing the order of the fields affects the
   Keystone UI */
export const Role = list({
  fields: {
    name: text({ isRequired: true }),
    ...permissionFields,
    assignedTo: relationship({
      ref: 'User.role',
      many: true,
      ui: {
        itemView: { fieldMode: "read" }
      },
    })
  },
});
