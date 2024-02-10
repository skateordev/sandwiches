import { useRouter } from 'next/router';
import { Products, Pagination } from '../../components';

export default function ProductsPage() {
  const { query } = useRouter();
  const currentPage = parseInt(query.paged, 10);

  return (
    <div>
      <Pagination currentPage={currentPage || 1} />
      <Products />
      <Pagination currentPage={currentPage || 1} />
    </div>
  );
}
