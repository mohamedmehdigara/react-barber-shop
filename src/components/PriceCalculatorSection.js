import React, { useState } from 'react';
import { SectionContainer, SectionTitle, PriceCalculatorCard, PriceTitle, ServiceItem, ServiceLabel, TotalPrice } from '../styled';

const PriceCalculatorSection = ({ services, theme }) => {
  const [selectedServices, setSelectedServices] = useState([]);

  const handleServiceSelection = (serviceName) => {
    setSelectedServices(prevSelected => {
      if (prevSelected.includes(serviceName)) {
        return prevSelected.filter(name => name !== serviceName);
      } else {
        return [...prevSelected, serviceName];
      }
    });
  };

  const totalCost = selectedServices.reduce((total, serviceName) => {
    const service = services.find(s => s.name === serviceName);
    return total + (service ? service.price : 0);
  }, 0);

  return (
    <SectionContainer theme={theme}>
      <SectionTitle theme={theme}>Calculate Your Total</SectionTitle>
      <PriceCalculatorCard theme={theme}>
        <PriceTitle theme={theme}>Select your services to see the total price:</PriceTitle>
        {services.map((service, index) => (
          <ServiceItem key={index}>
            <ServiceLabel theme={theme}>
              <input
                type="checkbox"
                checked={selectedServices.includes(service.name)}
                onChange={() => handleServiceSelection(service.name)}
              />
              {service.name}
            </ServiceLabel>
            <span>${service.price}</span>
          </ServiceItem>
        ))}
        <TotalPrice theme={theme}>
          Total: ${totalCost}
        </TotalPrice>
      </PriceCalculatorCard>
    </SectionContainer>
  );
};

export default PriceCalculatorSection;