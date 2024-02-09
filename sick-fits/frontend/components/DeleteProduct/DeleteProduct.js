import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { useRef, useState, useEffect } from 'react';
import Router from 'next/router';
import DELETE_PRODUCT_MUTATION from './mutations/deleteProductMutation';
import { SickButton } from '../styles';

const ModalLayer = styled.dialog`
  div {
    display: grid;
    gap: 0.5rem;
  }

  ::backdrop {
    background: hsl(0 0% 0% / 70%);
  }
`;

export default function DeleteProduct({ id, isModalOpen, cancelDelete }) {
  const [isOpen, setIsOpen] = useState(isModalOpen);
  const modalRef = useRef(null);

  useEffect(() => setIsOpen(isModalOpen), [isModalOpen]);

  useEffect(() => {
    const deleteModal = modalRef.current;

    if (deleteModal) {
      if (isOpen) {
        deleteModal.showModal();
      } else {
        deleteModal.close();
      }
    }
  }, []);

  // this will update the product listing without having to refetch/requery all products!
  function updateCache(cache, payload) {
    cache.evict(cache.identify(payload.data.deleteProduct));
  }

  // send deleteProductMutation
  const [deleteProduct, { loading: isDeleteLoading }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      update: updateCache,
      variables: { id },
    },
  );

  const deleteProductHandler = async () => {
    await deleteProduct().catch((err) => alert(err.message)); // eslint-disable-line no-alert

    setIsOpen(false);

    Router.push({
      pathname: '/products/',
    });
  };

  const cancelDeleteHandler = () => {
    cancelDelete();
  };

  return (
    <ModalLayer ref={modalRef}>
      <div>
        <SickButton
          onClick={cancelDeleteHandler}
          disabled={isDeleteLoading}
        >
          Just Kidding! 😅
        </SickButton>
        <SickButton
          onClick={deleteProductHandler}
          disabled={isDeleteLoading}
        >
          Delete 💣
        </SickButton>
      </div>
    </ModalLayer>
  );
}

DeleteProduct.propTypes = {
  id: PropTypes.string.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  cancelDelete: PropTypes.func,
};

DeleteProduct.defaultProps = {
  cancelDelete: () => { },
};
