import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCut, FaScissors, FaCrown, FaStar, FaUserTie } from 'react-icons/fa';

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

// Styled components for the appointment form
const AppointmentSection = styled(ServicesSection)`
  background-color: #1f1f1f;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #0d0d0d;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #f0f0f0;
`;

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid #333;
  background-color: #1a1a1a;
  color: #f0f0f0;
  &:focus {
    outline: none;
    border-color: #ffc107;
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid #333;
  background-color: #1a1a1a;
  color: #f0f0f0;
  &:focus {
    outline: none;
    border-color: #ffc107;
  }
`;

const Option = styled.option`
  background-color: #1a1a1a;
  color: #f0f0f0;
`;

const SubmitButton = styled(Button).attrs({ as: 'button', type: 'submit' })`
  width: 100%;
  border: none;
  cursor: pointer;
  margin-top: 1rem;
`;

// Styled components for the About Us section
const AboutSection = styled(ServicesSection)`
  background-color: #1a1a1a;
`;

const AboutText = styled.p`
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.6;
  font-size: 1.1rem;
  color: #e0e0e0;
`;

const BarberCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background-color: #0d0d0d;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
`;

const BarberImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #ffc107;
  margin-bottom: 1rem;
`;

const BarberName = styled.h3`
  font-size: 1.5rem;
  color: #ffc107;
  margin-bottom: 0.5rem;
`;

const BarberBio = styled.p`
  font-style: italic;
  color: #aaa;
  line-height: 1.4;
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
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

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

  const barbers = [
    {
      name: "Jack R.",
      bio: "With over 10 years of experience, Jack is a master of classic fades and precise beard work. He's a true artist.",
      image: "https://placehold.co/300x300/1a1a1a/ffffff?text=Jack"
    },
    {
      name: "Sarah G.",
      bio: "Specializing in modern styles and unique cuts, Sarah brings a creative touch to every client. She is a rising star in the industry.",
      image: "https://placehold.co/300x300/1a1a1a/ffffff?text=Sarah"
    },
    {
      name: "David M.",
      bio: "David's passion for grooming is matched only by his attention to detail. He provides the ultimate hot towel shave experience.",
      image: "https://placehold.co/300x300/1a1a1a/ffffff?text=David"
    }
  ];

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} color={i < count ? "#ffc107" : "#333"} />
    ));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to a backend or a booking API
    console.log('Booking submitted:', { name, email, service, date, time });
    alert('Booking request sent successfully! We will contact you shortly to confirm.');
    
    // Reset form fields after submission
    setName('');
    setEmail('');
    setService('');
    setDate('');
    setTime('');
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

      <AppointmentSection>
        <SectionTitle>Book Your Appointment</SectionTitle>
        <Form onSubmit={handleBookingSubmit}>
          <FormGroup>
            <Label htmlFor="name">Full Name</Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="service">Service</Label>
            <Select
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
            >
              <Option value="" disabled>Select a Service</Option>
              {services.map((s, index) => (
                <Option key={index} value={s.name}>
                  {s.name}
                </Option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="date">Date</Label>
            <Input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="time">Time</Label>
            <Input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </FormGroup>
          <SubmitButton>Book Now</SubmitButton>
        </Form>
      </AppointmentSection>

      <AboutSection>
        <SectionTitle>Meet Our Barbers</SectionTitle>
        <AboutText>
          Our team of dedicated barbers is committed to providing the highest quality grooming services. With years of experience and a passion for their craft, they are ready to give you the perfect look.
        </AboutText>
        <ServiceGrid>
          {barbers.map((barber, index) => (
            <BarberCard key={index}>
              <BarberImage src={barber.image} alt={barber.name} />
              <BarberName>{barber.name}</BarberName>
              <BarberBio>{barber.bio}</BarberBio>
            </BarberCard>
          ))}
        </ServiceGrid>
      </AboutSection>

      <Footer>
        <p>&copy; 2024 The Gents' Cut. All Rights Reserved.</p>
      </Footer>
    </Container>
  );
}

export default App;