import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Orders, Pagination } from '../../components';
import { ITEM_TYPE_ORDERS } from '../../components/constants';
import ORDERS_PAGINATION_QUERY from '../../components/Orders/queries/ordersPaginationQuery';

const OrdersPageStylee = styled.div`
  display: grid;
`;

export default function OrdersPage() {
  const { query } = useRouter();
  const currentPage = parseInt(query.paged, 10);

  return (
    <OrdersPageStylee>
      <Pagination
        itemType={ITEM_TYPE_ORDERS}
        currentPage={currentPage || 1}
        paginationQuery={ORDERS_PAGINATION_QUERY}
      />
      <Orders currentPage={currentPage || 1} />
      <Pagination
        itemType={ITEM_TYPE_ORDERS}
        currentPage={currentPage || 1}
        paginationQuery={ORDERS_PAGINATION_QUERY}
      />
    </OrdersPageStylee>
  );
}
