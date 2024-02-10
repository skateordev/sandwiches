import { Products, Pagination } from '../components';

export default function ProductsPage() {
  return (
    <div>
      <Pagination page={1} />
      <Products />
      <Pagination page={1} />
    </div>
  );
}
