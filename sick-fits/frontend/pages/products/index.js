import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Products, Pagination } from '../../components';

const ProductsPageStylee = styled.div`
  display: grid;
`;

export default function ProductsPage() {
  const { query } = useRouter();
  const currentPage = parseInt(query.paged, 10);

  return (
    <ProductsPageStylee>
      <Pagination currentPage={currentPage || 1} />
      <Products currentPage={currentPage || 1} />
      <Pagination currentPage={currentPage || 1} />
    </ProductsPageStylee>
  );
}
