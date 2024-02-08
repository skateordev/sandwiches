import { useState } from 'react';
import Router from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import styled from 'styled-components';
import useForm from '../../lib/useForm';
import { FormStyled, SickButton } from '../styles';
import ErrorMessage from '../ErrorMessage';
import { UPDATE_PRODUCT_MUTATION } from './mutations/updateProductMutation';
import { ALL_PRODUCTS_QUERY } from '../Products/queries/allProductsQuery';
import { SINGLE_ITEM_QUERY } from '../SingleProduct/queries/singleProductQuery';
import DeleteProduct from '../DeleteProduct/DeleteProduct';

const ActionBar = styled.div`
  display: grid;
  gap: .5rem;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
`;

export default function UpdateProduct({ id }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // get the existing product
  const {
    data: queryData,
    error: queryError,
    loading: isQueryLoading,
  } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id
    }
  });

  // create some state for the form inputs:
  const { inputs, handleChange } = useForm(queryData?.Product);

  const { name, price, description } = inputs;

  // send the mutation to update the product
  const [updateProduct, { data: updateData, error: updateError, loading: isUpdateLoading }] = useMutation(
    UPDATE_PRODUCT_MUTATION,
    {
      variables: {
        id,
        name,
        price,
        description,
      },
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  // function to do the actual update
  const updateProductHandler = async (evt) => {
    evt.preventDefault();

    // wait for input fields to be submitted to backend
    // could also pass variables object into updateProduct()
    // instead of defining them above 30::38
    const res = await updateProduct();

    // go to the newly created product's page
    Router.push({
      pathname: `/product/${res.data.updateProduct.id}`,
    })
  };

  const errorMessage = queryError || updateError;
  const isLoading = isQueryLoading || isUpdateLoading;

  if (isQueryLoading) return <div>Loading...💦</div>

  return (
    <>
      <FormStyled onSubmit={updateProductHandler}>
        <ErrorMessage error={errorMessage} />
        <fieldset disabled={isLoading} aria-busy={isLoading}>
          {/* <label htmlFor='image'>
            Image
            <input
              id="image"
              name="image"
              type="file"
              onChange={handleChange}
              required
            />
          </label> */}
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

        <ActionBar>
          <SickButton type="submit">Update Product ✨</SickButton>
          <SickButton type="button" onClick={() => setIsDeleteModalOpen(true)}>Delete Product 💀</SickButton>
        </ActionBar>
      </FormStyled>
      {isDeleteModalOpen && <DeleteProduct id={id} isModalOpen={isDeleteModalOpen} cancelDelete={() => setIsDeleteModalOpen(false)} />}
    </>
  )
};
