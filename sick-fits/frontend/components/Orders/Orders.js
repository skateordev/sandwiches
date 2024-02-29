import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import Order from './Order';
import ALL_ORDERS_QUERY from './queries/allOrdersQuery';
import { ITEMS_PER_PAGE } from '../constants';

const OrdersListStylee = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 60px;
`;

export default function Orders({ currentPage }) {
  const { data, error, loading } = useQuery(ALL_ORDERS_QUERY, {
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
    <div>
      <OrdersListStylee>
        {data.allOrders.map((order) => {
          const { id } = order;

          return (
            <Order key={id} order={order} />
          );
        })}
      </OrdersListStylee>
    </div>
  );
}

Orders.propTypes = {
  currentPage: PropTypes.number,
};

Orders.defaultProps = {
  currentPage: 1,
};
