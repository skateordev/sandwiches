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
      {/* eslint-disable react/jsx-one-expression-per-line, jsx-a11y/anchor-is-valid */}
      <Head>
        <title>SECK FETZ - Page {currentPage} of {pageCount}</title>
      </Head>
      <Link href={`/products/${currentPage + 1}`}>
        <a aria-disabled={currentPage <= 1}>👈 Prev</a>
      </Link>
      <p>Page {currentPage} of {pageCount}</p>
      <p>{productCount} Items Total</p>
      <Link href={`/products/${currentPage - 1}`}>
        <a aria-disabled={currentPage >= pageCount}>Next 👉</a>
      </Link>
      {/* eslint-enable react/jsx-one-expression-per-line, jsx-a11y/anchor-is-valid */}
    </PaginationStyled>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
};

Pagination.defaultProps = {
  currentPage: 1,
};
