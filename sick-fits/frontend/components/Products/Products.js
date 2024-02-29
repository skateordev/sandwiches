import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import Product from './Product';
import ALL_PRODUCTS_QUERY from './queries/allProductsQuery';
import { ITEMS_PER_PAGE } from '../constants';

const ProductsListStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products({ currentPage }) {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE,
      first: ITEMS_PER_PAGE,
    },
  });

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
    <ProductsListStyled>
      {data.allProducts.map((product) => {
        const { id } = product;

        return (
          <Product key={id} product={product} />
        );
      })}
    </ProductsListStyled>
  );
}

Products.propTypes = {
  currentPage: PropTypes.number,
};

Products.defaultProps = {
  currentPage: 1,
};
