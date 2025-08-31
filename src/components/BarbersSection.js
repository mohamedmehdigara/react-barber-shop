import React from 'react';
import { BarberName, BarberImage, BarberBio, Grid, AboutText, SectionTitle, SectionContainer, BarberCard } from '../styled';
const BarbersSection = ({ barbers, theme }) => {
  return (
    <SectionContainer theme={theme}>
      <SectionTitle theme={theme}>Meet Our Barbers</SectionTitle>
      <AboutText theme={theme}>
        Our team of dedicated barbers is committed to providing the highest quality grooming services. With years of experience and a passion for their craft, they are ready to give you the perfect look.
      </AboutText>
      <Grid>
        {barbers.map((barber, index) => (
          <BarberCard key={index} theme={theme}>
            <BarberImage src={barber.image} alt={barber.name} theme={theme} />
            <BarberName theme={theme}>{barber.name}</BarberName>
            <BarberBio theme={theme}>{barber.bio}</BarberBio>
          </BarberCard>
        ))}
      </Grid>
    </SectionContainer>
  );
};

export default BarbersSection;