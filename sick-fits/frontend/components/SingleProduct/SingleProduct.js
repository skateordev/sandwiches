import PropTypes from 'prop-types';
import { useQuery } from "@apollo/client";
import { SINGLE_ITEM_QUERY } from './queries/singleProductQuery';
import ErrorMessage from '../ErrorMessage';
import Head from 'next/head';
import styled from 'styled-components';
import { ItemStyled } from '../styles';

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
  const { data, error, loading: isLoading } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });

 if (error) return <ErrorMessage error={error} />;
 if (isLoading || !data) return <div>Loading... 💃</div>;

  const {
    name,
    photo,
    description,
  } = data.Product;

  return (
    <ProductStyled>
      <Head>
        <title>SECK FETS | {name}</title>
      </Head>
      <img src={photo?.image?.publicUrlTransformed} alt={photo?.altText} />
      <div className='details'>
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </ProductStyled>
  );
}

SingleProduct.propTypes = {
  id: PropTypes.string.isRequired,
};
