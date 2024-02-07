import gql from "graphql-tag";
import useForm from "../lib/useForm";
import { FormStyled, SickButton } from "./styles";
import { useMutation } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # which variables are getting passed in? and what types are the
    # ! deliminates a required input
    $name: String!
    $image: Upload
    $price: Int!
    $description: String!
  ) {
    createProduct(
      data: {
        name: $name
        photo: {
          create: {
            image: $image
            altText: $name
          }
        }
        price: $price
        status: "AVAILABLE"
        description: $description
      }
    ) {
      id
      price
      description
    }
  }
`;

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
      variables: inputs
    }
  );

  const submitNewProductHandler = async (evt) => {
    evt.preventDefault();

    await createProduct();

    clearForm();
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
