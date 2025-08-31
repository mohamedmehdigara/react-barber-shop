import React from 'react';
import { SectionContainer, SectionTitle, Grid, Card, HaircutImage, Name, FavoriteButton } from '../styled';
import { FaHeart } from 'react-icons/fa';

const GallerySection = ({ haircuts, theme, onOpenModal, onToggleFavorite, favorites }) => {
  return (
    <SectionContainer theme={theme}>
      <SectionTitle theme={theme}>Haircut Gallery</SectionTitle>
      <Grid>
        {haircuts.map((haircut) => (
          <Card key={haircut.id} theme={theme}>
            <HaircutImage
              src={haircut.image}
              alt={haircut.name}
              onClick={() => onOpenModal(haircut)}
            />
            <Name theme={theme}>{haircut.name}</Name>
            <FavoriteButton
              onClick={() => onToggleFavorite(haircut.id)}
              isFavorite={favorites.includes(haircut.id)}
              theme={theme}
            >
              <FaHeart />
            </FavoriteButton>
          </Card>
        ))}
      </Grid>
    </SectionContainer>
  );
};

export default GallerySection;
