import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import styled from 'styled-components';
import SINGLE_ORDER_QUERY from './queries/singleOrderQuery';
import ErrorMessage from '../ErrorMessage';
import formatMoney from '../../lib/formatMoney';

const ProductStyled = styled.div`
  display: grid;
  gap: 2rem;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  max-width: var(--maxWidth);
  place-items: start;

  img {
    width: 100%;
    object-fit: contain;
  }
`;

export default function SingleProduct({ id }) {
  const { data, error, loading: isLoading } = useQuery(SINGLE_ORDER_QUERY, {
    variables: {
      id,
    },
  });

  if (error) return <ErrorMessage error={error} />;
  if (isLoading || !data) return <div>Loading... 💃</div>;

  console.log({ data });

  const { total, items } = data.Order;

  const orderItems = items.map((item) => (
    <SingleProduct id={item.id} />
  ));

  return (
    <ProductStyled>
      <Head>
        <title>SECK FETS</title>
      </Head>
      <h2>Total: {formatMoney(total)}</h2>
      {orderItems}
    </ProductStyled>
  );
}

SingleProduct.propTypes = {
  id: PropTypes.string.isRequired,
};
