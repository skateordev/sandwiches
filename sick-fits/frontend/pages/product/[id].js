import { SingleProduct } from "../../components";

export default function SingleProductPage({ query }) {
  const { id: productId } = query;

  return <SingleProduct id={productId} />
};
