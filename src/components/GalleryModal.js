import React from 'react';
import { ModalOverlay, ModalContent, ModalCloseButton, FavoriteButtonInModal, ModalTitle, ModalDescription, Button } from '../styled';
import { FaHeart } from 'react-icons/fa';

const GalleryModal = ({ theme, haircut, onCloseModal, favorites, onToggleFavorite }) => {
  return (
    <ModalOverlay onClick={onCloseModal}>
      <ModalContent onClick={e => e.stopPropagation()} theme={theme}>
        <ModalCloseButton onClick={onCloseModal} theme={theme}>&times;</ModalCloseButton>
        <FavoriteButtonInModal
          onClick={() => onToggleFavorite(haircut.id)}
          isFavorite={favorites.includes(haircut.id)}
          theme={theme}
        >
          <FaHeart />
        </FavoriteButtonInModal>
        <img
          src={haircut.image}
          alt={haircut.name}
          style={{ width: '100%', borderRadius: '8px' }}
        />
        <ModalTitle theme={theme}>{haircut.name}</ModalTitle>
        <ModalDescription theme={theme}>{haircut.description}</ModalDescription>
        <Button as="button" onClick={onCloseModal} theme={theme}>Close</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default GalleryModal;