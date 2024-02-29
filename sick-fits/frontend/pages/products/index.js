import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Products, Pagination } from '../../components';
import { ITEM_TYPE_PRODUCTS } from '../../components/constants';
import PRODUCTS_PAGINATION_QUERY from '../../components/Products/queries/productsPaginationQuery';

const ProductsPageStylee = styled.div`
  display: grid;
`;

export default function ProductsPage() {
  const { query } = useRouter();
  const currentPage = parseInt(query.paged, 10);

  return (
    <ProductsPageStylee>
      <Pagination
        itemType={ITEM_TYPE_PRODUCTS}
        currentPage={currentPage || 1}
        paginationQuery={PRODUCTS_PAGINATION_QUERY}
      />
      <Products currentPage={currentPage || 1} />
      <Pagination
        itemType={ITEM_TYPE_PRODUCTS}
        currentPage={currentPage || 1}
        paginationQuery={PRODUCTS_PAGINATION_QUERY}
      />
    </ProductsPageStylee>
  );
}
