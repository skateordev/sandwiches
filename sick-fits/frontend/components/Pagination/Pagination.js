import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { PaginationStyled } from '../styles';
import PAGINATION_QUERY from './queries/paginationQuery';
import ErrorMessage from '../ErrorMessage';
import { ITEMS_PER_PAGE } from '../constants';

export default function Pagination({ currentPage }) {
  const { data, error, loading: isLoading } = useQuery(PAGINATION_QUERY);
  if (isLoading) return 'Loading...💦';
  if (error) return <ErrorMessage error={error} />;

  const { count: productCount } = data._allProductsMeta; // eslint-disable-line no-underscore-dangle
  const pageCount = Math.ceil(productCount / ITEMS_PER_PAGE);

  return (
    <PaginationStyled>
      <Head>
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        <title>SECK FETZ - Page {currentPage} of {pageCount}</title>
      </Head>
      <Link href={`/products/${currentPage + 1}`}>👈 Prev</Link>
      <p>
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        Page {currentPage} of {pageCount}
      </p>
      <p>
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        {productCount} Items Total
      </p>
      <Link href={`/products/${currentPage - 1}`}>Next 👉</Link>
    </PaginationStyled>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
};

Pagination.defaultProps = {
  currentPage: 1,
};
