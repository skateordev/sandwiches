import Link from 'next/link';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import { ItemStyles as ItemStyled } from './styles/ItemStyles';
import formatMoney from '../lib/formatMoney';


export default function Product({
  product
}) {
  const {
    id,
    name,
    photo: { image },
    price,
    description,
  } = product;

  return (
    <ItemStyled>
      <img src={image?.publicUrlTransformed} alt={name} />
      <Title>
        <Link href={`/product/${id}`}>{name}</Link>
      </Title>
      <PriceTag>{formatMoney(price)}</PriceTag>
      <p>{description}</p>
      {/* Add buttons to edit and delete */}
    </ItemStyled>
  )
};
