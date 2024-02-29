import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { PaginationStylee } from '../styles';
import PAGINATION_QUERY from './queries/paginationQuery';
import ErrorMessage from '../ErrorMessage';
import { ITEMS_PER_PAGE } from '../constants';

export default function Pagination({ currentPage }) {
  const { data, error, loading: isLoading } = useQuery(PAGINATION_QUERY);
  if (isLoading) return 'Loading...💦';
  if (error) return <ErrorMessage error={error} />;

  const { count: productCount } = data._allProductsMeta;
  const pageCount = Math.ceil(productCount / ITEMS_PER_PAGE);

  return (
    <PaginationStylee>
      {/* eslint-disable react/jsx-one-expression-per-line */}
      <Head>
        <title>SECK FETZ - Page {currentPage} of {pageCount}</title>
      </Head>
      <Link href={`/products/${currentPage - 1}`} passHref>
        <a href="passedHref" aria-disabled={currentPage <= 1}>👈 Prev</a>
      </Link>
      <p>Page {currentPage} of {pageCount}</p>
      <p>{productCount} Items Total</p>
      <Link href={`/products/${currentPage + 1}`} passHref>
        <a href="passedHref" aria-disabled={currentPage >= pageCount}>Next 👉</a>
      </Link>
      {/* eslint-enable react/jsx-one-expression-per-line */}
    </PaginationStylee>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
};

Pagination.defaultProps = {
  currentPage: 1,
};
