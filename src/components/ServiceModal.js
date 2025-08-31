import React from 'react';
import { ModalOverlay, ModalContent, ModalCloseButton, ModalTitle, ModalDescription, Button } from '../styled';

const ServiceModal = ({ theme, service, onCloseModal }) => {
  return (
    <ModalOverlay onClick={onCloseModal}>
      <ModalContent onClick={e => e.stopPropagation()} theme={theme}>
        <ModalCloseButton onClick={onCloseModal} theme={theme}>&times;</ModalCloseButton>
        <ModalTitle theme={theme}>{service.name}</ModalTitle>
        <ModalDescription theme={theme}>{service.description}</ModalDescription>
        <Button as="button" onClick={onCloseModal} theme={theme}>Close</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ServiceModal;