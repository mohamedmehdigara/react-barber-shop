import React from 'react';
import { SectionContainer, SectionTitle, Grid, Card, Icon, Name, Price, ViewDetailsButton } from '../styled';
import { FaCut, FaCrown } from 'react-icons/fa';

const serviceIcons = {
  "Classic Haircut": <FaCut />,
  "Hot Towel Shave": <FaCut />,
  "Beard Trim & Shape": <FaCrown />,
  "Haircut & Shave Combo": <FaCut />,
};

const ServicesSection = ({ services, theme, onOpenModal }) => {
  return (
    <SectionContainer theme={theme}>
      <SectionTitle theme={theme}>Our Services</SectionTitle>
      <Grid>
        {services.map((service, index) => (
          <Card key={index} theme={theme}>
            <Icon theme={theme}>{serviceIcons[service.name]}</Icon>
            <Name theme={theme}>{service.name}</Name>
            <Price theme={theme}>${service.price}</Price>
            <ViewDetailsButton onClick={() => onOpenModal(service)} theme={theme}>View Details</ViewDetailsButton>
          </Card>
        ))}
      </Grid>
    </SectionContainer>
  );
};

export default ServicesSection;
