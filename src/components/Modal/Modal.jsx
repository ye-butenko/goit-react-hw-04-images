import React, { useEffect } from 'react';
import { StyledOverlay, StyledModal } from './Modal.styled';

export const Modal = ({ closeModal, tags, modalImg }) => {
  useEffect(() => {
    const closeByEsc = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', closeByEsc);

    return () => {
      window.removeEventListener('keydown', closeByEsc);
    };
  }, [closeModal]);

  return (
    <StyledOverlay onClick={closeModal}>
      <StyledModal>
        <img src={modalImg} alt={tags} />
      </StyledModal>
    </StyledOverlay>
  );
};
