import Link from 'next/link';
import formatMoney from '../lib/formatMoney';
import { ItemStyled, TitleStyled, PriceTagStyled } from './styles';


export default function Product({
  product
}) {
  const {
    id,
    name,
    photo,
    price,
    description,
  } = product;

  return (
    <ItemStyled>
      <img src={photo?.image?.publicUrlTransformed} alt={name} />
      <TitleStyled>
        <Link href={`/product/${id}`}>{name}</Link>
      </TitleStyled>
      <PriceTagStyled>{formatMoney(price)}</PriceTagStyled>
      <p>{description}</p>
      {/* Add buttons to edit and delete */}
    </ItemStyled>
  )
};
