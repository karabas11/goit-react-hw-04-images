/* eslint-disable react/prop-types */
import { useState } from 'react';
import { ModalWindow } from 'components/Modal/ModalWindow';
import { GaleryItem, GaleryItemImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <GaleryItem>
      <GaleryItemImage src={webformatURL} alt={tags} onClick={openModal} />
      <ModalWindow
        onCloseModal={closeModal}
        largeImageURL={largeImageURL}
        alt={tags}
        isModalOpen={isModalOpen}
      />
    </GaleryItem>
  );
};

export default ImageGalleryItem;
