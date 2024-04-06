import PropTypes from 'prop-types';
import Link from 'next/link';
import formatMoney from '../../lib/formatMoney';
import { ItemStyled, TitleStyled, PriceTagStyled } from '../styles';
import AddToCart from '../AddToCart/AddToCart';

export default function Product({
  product,
}) {
  const {
    id: productId,
    name,
    photo,
    price,
    description,
  } = product;

  return (
    <ItemStyled>
      <img src={photo?.image?.publicUrlTransformed} alt={name} />
      <TitleStyled>
        <Link href={`/product/${productId}`}>{name}</Link>
      </TitleStyled>
      <PriceTagStyled>{formatMoney(price)}</PriceTagStyled>
      <p>{description}</p>
      {/* Add buttons to edit and delete */}
      <div className="buttonList">
        <Link href={{
          pathname: '/update',
          query: { id: productId },
        }}
        >
          Edit 📝
        </Link>
        <AddToCart productId={productId} />
      </div>
    </ItemStyled>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    photo: PropTypes.shape({
      id: PropTypes.string,
      image: PropTypes.shape({
        publicUrlTransformed: PropTypes.string,
      }),
    }),
    price: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
};
