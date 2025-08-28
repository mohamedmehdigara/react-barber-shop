import React from 'react';
import styled from 'styled-components';
import { FaCut, FaScissors, FaCrown, FaStar } from 'react-icons/fa';

// Styled Components
// A dark, responsive container for the entire application.
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #1a1a1a;
  color: #f0f0f0;
  font-family: 'Inter', sans-serif;
`;

// Header with a bold, gold-accented title.
const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #0d0d0d;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #ffc107;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

// Hero section with a background image and overlay for text readability.
const HeroSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 50vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://placehold.co/1200x600/1a1a1a/ffffff?text=Barber+Shop+Interior');
  background-size: cover;
  background-position: center;
  padding: 2rem;
  flex-direction: column;
`;

const HeroText = styled.p`
  font-size: 1.5rem;
  font-style: italic;
  margin-top: 1rem;
  color: #e0e0e0;
  max-width: 600px;
`;

// Section for services.
const ServicesSection = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background-color: #1f1f1f;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #ffc107;
  margin-bottom: 2rem;
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ServiceCard = styled.div`
  background-color: #0d0d0d;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
  }
`;

const ServiceIcon = styled.div`
  font-size: 3rem;
  color: #ffc107;
  margin-bottom: 1rem;
`;

const ServiceName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const ServicePrice = styled.p`
  font-size: 1.2rem;
  font-style: italic;
  color: #888;
`;

// Call-to-action button.
const Button = styled.a`
  display: inline-block;
  background-color: #ffc107;
  color: #1a1a1a;
  padding: 0.8rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  
  &:hover {
    background-color: #e0a800;
    transform: scale(1.05);
  }
`;

// Section for reviews.
const ReviewsSection = styled(ServicesSection)`
  background-color: #1a1a1a;
`;

const ReviewCard = styled(ServiceCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0d0d0d;
  padding: 1.5rem;
  text-align: center;
  border-radius: 12px;
`;

const ReviewText = styled.p`
  font-style: italic;
  margin: 1rem 0;
  color: #e0e0e0;
`;

const ReviewAuthor = styled.p`
  font-weight: 600;
  color: #ffc107;
`;

const Stars = styled.div`
  color: #ffc107;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

// Simple footer.
const Footer = styled.footer`
  text-align: center;
  padding: 1.5rem;
  background-color: #0d0d0d;
  margin-top: auto;
  color: #aaa;
  font-size: 0.9rem;
`;

// Main App Component
function App() {
  const services = [
    { name: "Classic Haircut", price: "$30" },
    { name: "Hot Towel Shave", price: "$25" },
    { name: "Beard Trim & Shape", price: "$20" },
    { name: "Haircut & Shave Combo", price: "$50" },
  ];

  const reviews = [
    {
      text: "The best haircut I've ever had! The barber was meticulous and the atmosphere was great.",
      author: "John D.",
      stars: 5,
    },
    {
      text: "Professional, friendly, and they pay attention to every detail. Highly recommend the hot towel shave!",
      author: "Michael P.",
      stars: 5,
    },
    {
      text: "Always a fantastic experience. The team is skilled and I'm never disappointed with the results.",
      author: "Robert L.",
      stars: 4,
    },
  ];

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} color={i < count ? "#ffc107" : "#333"} />
    ));
  };

  return (
    <Container>
      <Header>
        <Title>The Gents' Cut</Title>
      </Header>

      <HeroSection>
        <Title>Craftsmanship. Style. Precision.</Title>
        <HeroText>
          Experience the art of grooming in a modern and relaxing atmosphere. We are dedicated to providing the perfect cut and shave.
        </HeroText>
        <Button href="#">Book Your Appointment</Button>
      </HeroSection>

      <ServicesSection>
        <SectionTitle>Our Services</SectionTitle>
        <ServiceGrid>
          {services.map((service, index) => (
            <ServiceCard key={index}>
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceName>{service.name}</ServiceName>
              <ServicePrice>{service.price}</ServicePrice>
            </ServiceCard>
          ))}
        </ServiceGrid>
      </ServicesSection>

      <ReviewsSection>
        <SectionTitle>What Our Clients Say</SectionTitle>
        <ServiceGrid>
          {reviews.map((review, index) => (
            <ReviewCard key={index}>
              <Stars>{renderStars(review.stars)}</Stars>
              <ReviewText>"{review.text}"</ReviewText>
              <ReviewAuthor>- {review.author}</ReviewAuthor>
            </ReviewCard>
          ))}
        </ServiceGrid>
      </ReviewsSection>

      <Footer>
        <p>&copy; 2024 The Gents' Cut. All Rights Reserved.</p>
      </Footer>
    </Container>
  );
}

export default App;
