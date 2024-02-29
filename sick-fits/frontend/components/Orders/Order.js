import PropTypes from 'prop-types';
import Link from 'next/link';
import formatMoney from '../../lib/formatMoney';
import { OrderStylee } from '../styles';

export default function Order({
  order,
}) {
  const {
    id: orderId,
    items,
    total,
    charge,
  } = order;

  return (
    <Link href={{
      pathname: `/order/${orderId}`,
    }}
    >
      <OrderStylee>
        <div className="order-meta">
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
        </div>
      </OrderStylee>
    </Link>
  );
}

Order.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string,
    items: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    total: PropTypes.number,
    charge: PropTypes.string,
  }).isRequired,
};
