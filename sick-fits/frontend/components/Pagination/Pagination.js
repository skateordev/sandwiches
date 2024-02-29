import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { PaginationStylee } from '../styles';
import ErrorMessage from '../ErrorMessage';
import { ITEMS_PER_PAGE } from '../constants';
import capitalize from '../../lib/capitalize';
import itemCountByType from '../../lib/itemCountByType';

export default function Pagination({
  itemType,
  currentPage,
  paginationQuery,
}) {
  const { data, error, loading: isLoading } = useQuery(paginationQuery);
  if (isLoading) return 'Loading...💦';
  if (error) return <ErrorMessage error={error} />;

  const count = itemCountByType(data, itemType);
  const pageCount = Math.ceil(count / ITEMS_PER_PAGE);

  return (
    <PaginationStylee>
      {/* eslint-disable react/jsx-one-expression-per-line */}
      <Head>
        <title>SECK FETZ - Page {currentPage} of {pageCount}</title>
      </Head>
      <Link href={`/${itemType}/${currentPage - 1}`} passHref>
        <a href="passedHref" aria-disabled={currentPage <= 1}>👈 Prev</a>
      </Link>
      <p>Page {currentPage} of {pageCount}</p>
      <p>{count} {itemType > 1 ? `${capitalize(itemType)}s` : capitalize(itemType)} Total</p>
      <Link href={`/${itemType}/${currentPage + 1}`} passHref>
        <a href="passedHref" aria-disabled={currentPage >= pageCount}>Next 👉</a>
      </Link>
      {/* eslint-enable react/jsx-one-expression-per-line */}
    </PaginationStylee>
  );
}

Pagination.propTypes = {
  itemType: PropTypes.string.isRequired,
  currentPage: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  paginationQuery: PropTypes.object.isRequired,
};

Pagination.defaultProps = {
  currentPage: 1,
};
