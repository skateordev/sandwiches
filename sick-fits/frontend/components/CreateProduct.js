import useForm from "../lib/useForm";
import { FormStyled, SickButton } from "./styles";

export default function CreateProduct() {
  const { inputs, clearForm, resetForm, handleChange } = useForm({
    name: 'mock name',
    price: 4444,
    image: '',
    description: 'I got somethin to say',
  });

  const { name, price, description } = inputs;

  const submitNewProductHandler = (evt) => {
    evt.preventDefault();
  };

  return (
    <FormStyled onSubmit={submitNewProductHandler}>
      <fieldset>
        <label htmlFor="image">
          Image
          <input
            id="image"
            name="image"
            type="file"
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={handleChange}
            placeholder="name"
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            id="price"
            name="price"
            type="number"
            value={price}
            onChange={handleChange}
            placeholder="4444"
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="price"
            value={description}
            onChange={handleChange}
            placeholder="Descript the product"
          />
        </label>
      </fieldset>

      <SickButton type="submit">+ Add Product</SickButton>
    </FormStyled>
  )
};
