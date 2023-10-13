import React, { useState } from 'react';
import { StyledGalleryItem } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <StyledGalleryItem>
      <img
        src={webformatURL}
        alt={tags}
        width="500"
        height="210"
        loading="lazy"
        onClick={toggleModal}
      />

      {isModalOpen && (
        <Modal modalImg={largeImageURL} tags={tags} closeModal={toggleModal} />
      )}
    </StyledGalleryItem>
  );
};
