import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import formatMoney from '../../lib/formatMoney';
import { OrderStylee } from '../styles';

const OrderImages = styled.div`
  height: 120px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  overflow: hidden;
  align-content: center;

  .picture-frame {
    transform: rotate(6deg) scale(120%);
    height: 200px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 140px;
      object-fit: cover;
      transform: rotate(-6deg) scale(150%);
    }
  }
`;

export default function Order({
  order,
}) {
  const {
    id: orderId,
    items,
    total,
    charge,
  } = order;

  const orderImages = items.map((item) => (
    <div className="picture-frame">
      <img
        key={item.id}
        src={item?.photo?.image?.publicUrlTransformed}
        alt={item.photo.altText}
      />
    </div>
  ));

  return (
    <OrderStylee className="order">
      <div className="order-meta">
        <OrderImages>{orderImages}</OrderImages>
        <p>
          <span>Order Id: </span>
          <Link href={{ pathname: `/order/${orderId}` }}>
            <span className="linked">{orderId}</span>
          </Link>
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
