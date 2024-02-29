/**
 * Determines the number of items for the given itemType
 * Used primarily for pagination and cache
 * @param {object} data: object read from cache or returnd from paginationQuery
 * @param {string} itemType
 * @returns {number} itemType meta count property
 */
import { ITEM_TYPE_ORDERS, ITEM_TYPE_PRODUCTS } from '../components/constants';

export default function itemCountByType(data, itemType) {
  let count = 0;

  switch (itemType) {
    case ITEM_TYPE_ORDERS:
      count = data?._allOrdersMeta?.count;
      break;
    case ITEM_TYPE_PRODUCTS:
      count = data?._allProductsMeta?.count;
      break;
    default:
      break;
  }

  return count;
}
