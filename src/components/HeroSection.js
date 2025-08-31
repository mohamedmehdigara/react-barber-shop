import React from 'react';
import { HeroSectionContainer, Title, HeroText, Button } from '../styled';

const HeroSection = ({ theme }) => {
  return (
    <HeroSectionContainer theme={theme}>
      <Title theme={theme}>Craftsmanship. Style. Precision.</Title>
      <HeroText theme={theme}>
        Experience the art of grooming in a modern and relaxing atmosphere. We are dedicated to providing the perfect cut and shave.
      </HeroText>
      <Button href="#" theme={theme}>Book Your Appointment</Button>
    </HeroSectionContainer>
  );
};

export default HeroSection;
