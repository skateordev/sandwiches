import { useRouter } from 'next/router';
import { Orders, Pagination } from '../../components';

export default function OrdersPage() {
  const { query } = useRouter();
  const currentPage = parseInt(query.paged, 10);

  return (
    <div>
      <Pagination currentPage={currentPage || 1} />
      <Orders currentPage={currentPage || 1} />
      <Pagination currentPage={currentPage || 1} />
    </div>
  );
}
