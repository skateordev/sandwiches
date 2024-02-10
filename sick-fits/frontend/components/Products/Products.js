import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import Product from './Product';
import ALL_PRODUCTS_QUERY from './queries/allProductsQuery';

const ProductsListStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products() {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);

  if (loading) { return <p>Loading...⏳</p>; }

  if (error) {
    return (
      <p>
        Error! 😱
        {error.message}
      </p>
    );
  }

  return (
    <div>
      <ProductsListStyled>
        {data.allProducts.map((product) => {
          const { id } = product;

          return (
            <Product key={id} product={product} />
          );
        })}
      </ProductsListStyled>
    </div>
  );
}
