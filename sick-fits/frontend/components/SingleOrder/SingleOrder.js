import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import { useMemo } from 'react';
import SINGLE_ORDER_QUERY from './queries/singleOrderQuery';
import ErrorMessage from '../ErrorMessage';
import formatMoney from '../../lib/formatMoney';
import { OrderItemStylee, OrderStylee } from '../styles';

export default function SingleOrder({ id }) {
  const { data, error, loading: isLoading } = useQuery(SINGLE_ORDER_QUERY, {
    variables: {
      id,
    },
  });

  if (error) return <ErrorMessage error={error} />;
  if (isLoading || !data) return <div>Loading... 💃</div>;

  const {
    id: orderId,
    items,
    total,
    charge,
  } = data.Order;

  const orderDetails = useMemo(() => (
    <>
      <p>
        <span>Order Id: </span>
        <span>{orderId}</span>
      </p>
      <p>
        <span>Charge Id: </span>
        <span>{charge}</span>
      </p>
      <p>
        <span>Order Total: </span>
        <span>{formatMoney(total)}</span>
      </p>
      <p>
        <span>Item count: </span>
        <span>{items.reduce((tally, { quantity }) => tally + quantity, 0)}</span>
      </p>
    </>
  ), []);

  const orderItems = items.map((item) => {
    const {
      id: itemId,
      name,
      price,
      quantity,
      description,
      photo: {
        image,
        altText,
      },
    } = item;

    return (
      <OrderItemStylee key={itemId}>
        <img
          alt={altText}
          src={image.publicUrlTransformed}
        />
        <div className="item-meta">
          <h3>{name}</h3>
          {description && (
            <p>
              <span>Description: </span>
              <span>{description}</span>
            </p>
          )}
          <p>
            <span>Product Id: </span>
            <span>{itemId}</span>
          </p>
          <p>
            <span>Price (each): </span>
            <span>{formatMoney(price)}</span>
          </p>
          <p>
            <span>Quantitty: </span>
            <span>{quantity}</span>
          </p>
          -------------------------
          <p>
            <span>Sub-total: </span>
            <span>{formatMoney(quantity * price)}</span>
          </p>
        </div>
      </OrderItemStylee>
    );
  });

  return (
    <OrderStylee>
      <Head><title>SECK FETS | {orderId}</title></Head>
      {orderDetails}
      {orderItems}
    </OrderStylee>
  );
}

SingleOrder.propTypes = {
  id: PropTypes.string.isRequired,
};
