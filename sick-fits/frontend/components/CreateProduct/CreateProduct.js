import useForm from "../../lib/useForm";
import { FormStyled, SickButton } from "../styles";
import Router from "next/router";
import { useMutation } from "@apollo/client";
import ErrorMessage from "../ErrorMessage";
import { CREATE_PRODUCT_MUTATION } from "./mutations/createProductMutation";
import { ALL_PRODUCTS_QUERY } from "../Products/queries/allProductsQuery";

export default function CreateProduct() {
  const initialValues = {
    name: 'mock name',
    price: 4444,
    image: '',
    description: 'I got somethin to say',
  };

  const { inputs, clearForm, resetForm, handleChange } = useForm(initialValues);

  const { name, price, description } = inputs;

  const [createProduct, { data, error: errorMessage, loading: isLoading }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  const submitNewProductHandler = async (evt) => {
    // prevent passing url params
    evt.preventDefault();

    // wait for input fields to be submitted to backend
    const res = await createProduct();

    // go to the newly created product's page
    Router.push({
      pathname: `/product/${res.data.createProduct.id}`,
    })
  };

  return (
    <FormStyled onSubmit={submitNewProductHandler}>
      <ErrorMessage error={errorMessage} />
      <fieldset disabled={isLoading} aria-busy={isLoading}>
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
            placeholder="100"
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
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
