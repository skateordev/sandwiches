import { UpdateProduct } from "../components";

export default function UpdateProductPage({ query }) {
  const { id } = query;

  return <UpdateProduct id={id}/>
}
