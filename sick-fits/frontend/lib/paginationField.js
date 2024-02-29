import itemCountByType from './itemCountByType';

export default function paginationField(query, itemType) {
  return ({
    keyArgs: false, // tells apollo we will take care of everything
    read: (existing = [], { args, cache }) => { // eslint-disable-line default-param-last
      /**  first we ask `read` function for some items
        *  we can either:
        *    return items already in cache
        *    - or -
        *    return false (and make/cause a network request to refresh) */

      const { skip, first } = args;

      // read number of items on the page from cache
      const data = cache.readQuery({ query });
      const count = itemCountByType(data, itemType);

      // current page number and total number of pages
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      /* check if we have existing items and also filter out undefined
         if doing 4 items per page then on the 2nd page skip would be 4
         skip + first = 8, so items = 5, 6, 7, 8 */
      const items = existing.slice(skip, skip + first).filter((item) => item);

      if (items.length && items.length !== first && page === pages) {
        /* when there aren't enough items for a full page (partial last page)
           just gimme whatever there is */

        return items;
      }

      if (items.length !== first) {
        // there are no items! go to network and fetch!

        return false;
      }

      if (items.length) {
        /* items have been found in cache, don't need to
           go to network */
        console.log(`💥 GOT EEEM!\n🔍 Found ${existing.length} cached items!\n🪂 Sending to apollo...`);

        return items;
      }

      return false; // fallback to network request
    },
    merge: (existing, incoming, { args }) => {
      // this runs when the Apollo client comes back from the network with our product
      const { skip } = args;

      console.log(`Merging ${incoming.length} items from the network 🌐`);

      const merged = existing ? existing.slice(0) : [];

      for (let i = skip; i < skip + incoming.length; i++) {
        merged[i] = incoming[i - skip];
      }

      return merged;
    },
  });
}
