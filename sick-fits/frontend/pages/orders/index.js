import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Orders, Pagination } from '../../components';

const OrdersPageStylee = styled.div`
  display: grid;
`;

export default function OrdersPage() {
  const { query } = useRouter();
  const currentPage = parseInt(query.paged, 10);

  return (
    <OrdersPageStylee>
      <Pagination currentPage={currentPage || 1} />
      <Orders currentPage={currentPage || 1} />
      <Pagination currentPage={currentPage || 1} />
    </OrdersPageStylee>
  );
}
