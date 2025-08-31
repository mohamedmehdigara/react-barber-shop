import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaCut, FaCrown, FaStar } from 'react-icons/fa';

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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

// Section for services with a fade-in animation.
const ServicesSection = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background-color: #1f1f1f;
  animation: ${fadeIn} 1s ease-out;
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

const ViewDetailsButton = styled(Button).attrs({ as: 'button' })`
  font-size: 0.8rem;
  padding: 0.6rem 1.2rem;
  margin-top: 1rem;
`;

// Section for reviews with a fade-in animation.
const ReviewsSection = styled(ServicesSection)`
  background-color: #1a1a1a;
  animation: ${fadeIn} 1s ease-out;
`;

// Styled components for the testimonial slider
const ReviewSlider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const ReviewCard = styled.div`
  background-color: #0d0d0d;
  padding: 1.5rem;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  width: 100%;
  max-width: 500px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: opacity 0.5s ease;
`;

const SliderButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  color: #ffc107;
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;
  &:hover {
    transform: scale(1.1);
    color: #fff;
  }
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

// Styled components for the appointment form with a fade-in animation.
const AppointmentSection = styled(ServicesSection)`
  background-color: #1f1f1f;
  animation: ${fadeIn} 1s ease-out;
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
  ${props => props.disabled && `
    background-color: #555;
    cursor: not-allowed;
  `}
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

const SuccessMessage = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: #1f4e38;
  color: #d1e7dd;
  border-radius: 8px;
  text-align: center;
`;

const AvailabilityMessage = styled.p`
  color: #ffc107;
  font-size: 0.9rem;
  text-align: left;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
  font-style: italic;
`;

// Styled components for the About Us section with a fade-in animation.
const AboutSection = styled(ServicesSection)`
  background-color: #1a1a1a;
  animation: ${fadeIn} 1s ease-out;
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

// Styled Components for Price Calculator with a fade-in animation.
const PriceCalculatorSection = styled(ServicesSection)`
  background-color: #1f1f1f;
  animation: ${fadeIn} 1s ease-out;
`;

const PriceCalculatorCard = styled(ServiceCard)`
  background-color: #0d0d0d;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
`;

const PriceTitle = styled.h3`
  font-size: 1.5rem;
  color: #ffc107;
  margin-bottom: 1rem;
`;

const ServiceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ServiceLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;
  cursor: pointer;
`;

const TotalPrice = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  margin-top: 1.5rem;
  text-align: center;
  border-top: 2px solid #333;
  padding-top: 1rem;
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

// Modal styled components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #1f1f1f;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.8);
  max-width: 600px;
  width: 90%;
  text-align: center;
  position: relative;
  animation: ${fadeIn} 0.5s ease-out;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #ffc107;
  cursor: pointer;
`;

const ModalTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: #ffc107;
  margin-bottom: 1rem;
`;

const ModalDescription = styled.p`
  font-size: 1.1rem;
  color: #e0e0e0;
  line-height: 1.6;
  margin-bottom: 2rem;
`;


// Main App Component
function App() {
  const [name, setName] = useState('');
  const [barber, setBarber] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [nameError, setNameError] = useState('');
  const [dateError, setDateError] = useState('');
  const [modalState, setModalState] = useState({ isOpen: false, service: null });
  
  // A temporary, in-memory schedule to track availability.
  // The schedule is hardcoded for specific dates in 2025.
  const initialSchedule = {
    'Jack R.': {
      '2025-09-01': ['09:00', '10:00', '11:00', '13:00', '14:00'],
      '2025-09-02': ['09:30', '10:30', '11:30', '12:30'],
      '2025-09-03': ['10:00', '11:00', '13:00', '14:00', '15:00'],
    },
    'Sarah G.': {
      '2025-09-01': ['09:00', '10:00', '11:00', '12:00', '13:00'],
      '2025-09-02': ['10:00', '11:00', '12:00', '14:00'],
      '2025-09-03': ['09:30', '10:30', '11:30', '13:30', '14:30'],
    },
    'David M.': {
      '2025-09-01': ['10:00', '11:00', '12:00', '13:00'],
      '2025-09-02': ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
      '2025-09-03': ['10:00', '11:00', '12:00', '13:00'],
    }
  };
  const [schedule, setSchedule] = useState(initialSchedule);

  const services = [
    { 
      name: "Classic Haircut", 
      price: 30, 
      icon: <FaCut />,
      description: "A traditional haircut tailored to your head and face shape. Our barbers use clippers and scissors to create a precise, clean finish. Includes a wash and style."
    },
    { 
      name: "Hot Towel Shave", 
      price: 25, 
      icon: <FaCut />,
      description: "A luxurious and relaxing hot towel shave. We prepare your skin with hot towels and pre-shave oil, followed by a close shave and a soothing aftershave balm."
    },
    { 
      name: "Beard Trim & Shape", 
      price: 20, 
      icon: <FaCrown />,
      description: "Keep your beard looking its best with a professional trim and shape. Our barbers will sculpt your beard to perfection, followed by a final oil treatment."
    },
    { 
      name: "Haircut & Shave Combo", 
      price: 50, 
      icon: <FaCut />,
      description: "The ultimate grooming package. Get a classic haircut and our signature hot towel shave at a discounted price."
    },
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

  // Effect to automatically slide through reviews
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000); // Change review every 5 seconds
    return () => clearInterval(timer);
  }, [reviews.length]);

  const handleNextReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrevReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} color={i < count ? "#ffc107" : "#333"} />
    ));
  };

  const validateForm = () => {
    let isValid = true;
    
    // Name validation
    if (!name.trim()) {
      setNameError('Full name is required.');
      isValid = false;
    } else {
      setNameError('');
    }

    // Date validation
    const today = new Date().toISOString().split('T')[0];
    if (!date || date < today) {
      setDateError('Please select a future date.');
      isValid = false;
    } else {
      setDateError('');
    }

    return isValid;
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (validateForm() && barber && date && time) {
      // Update the schedule to "book" the time slot
      const newSchedule = JSON.parse(JSON.stringify(schedule)); // Deep copy
      const availableTimes = newSchedule[barber][date];
      if (availableTimes) {
        newSchedule[barber][date] = availableTimes.filter(slot => slot !== time);
        setSchedule(newSchedule);
      }

      // Show success message
      setIsSubmitted(true);
      
      // Reset form fields after submission
      setName('');
      setBarber('');
      setService('');
      setDate('');
      setTime('');
      
      // Hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

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

  const handleOpenModal = (service) => {
    setModalState({ isOpen: true, service });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, service: null });
  };

  const isFormValid = name && barber && service && date && time && !nameError && !dateError;

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
              <ServicePrice>${service.price}</ServicePrice>
              <ViewDetailsButton onClick={() => handleOpenModal(service)}>View Details</ViewDetailsButton>
            </ServiceCard>
          ))}
        </ServiceGrid>
      </ServicesSection>

      <PriceCalculatorSection>
        <SectionTitle>Calculate Your Total</SectionTitle>
        <PriceCalculatorCard>
          <PriceTitle>Select your services to see the total price:</PriceTitle>
          {services.map((service, index) => (
            <ServiceItem key={index}>
              <ServiceLabel>
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
          <TotalPrice>
            Total: ${totalCost}
          </TotalPrice>
        </PriceCalculatorCard>
      </PriceCalculatorSection>

      <ReviewsSection>
        <SectionTitle>What Our Clients Say</SectionTitle>
        <ReviewSlider>
          <SliderButton onClick={handlePrevReview}>&lt;</SliderButton>
          <ReviewCard>
            <Stars>{renderStars(reviews[currentReviewIndex].stars)}</Stars>
            <ReviewText>"{reviews[currentReviewIndex].text}"</ReviewText>
            <ReviewAuthor>- {reviews[currentReviewIndex].author}</ReviewAuthor>
          </ReviewCard>
          <SliderButton onClick={handleNextReview}>&gt;</SliderButton>
        </ReviewSlider>
      </ReviewsSection>

      <AppointmentSection>
        <SectionTitle>Book Your Appointment</SectionTitle>
        <Form onSubmit={handleBookingSubmit}>
          {isSubmitted && <SuccessMessage>Booking request sent successfully! We have confirmed your appointment. The time slot is now removed from availability.</SuccessMessage>}
          <FormGroup>
            <Label htmlFor="name">Full Name</Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError('');
              }}
              onBlur={validateForm}
              required
            />
            {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="barber">Choose Your Barber</Label>
            <Select
              id="barber"
              value={barber}
              onChange={(e) => {
                setBarber(e.target.value);
                setTime(''); // Reset time when barber changes
              }}
              required
            >
              <Option value="" disabled>Select a Barber</Option>
              {barbers.map((b, index) => (
                <Option key={index} value={b.name}>
                  {b.name}
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
              onChange={(e) => {
                setDate(e.target.value);
                setDateError('');
                setTime(''); // Reset time when date changes
              }}
              onBlur={validateForm}
              required
            />
            {dateError && <ErrorMessage>{dateError}</ErrorMessage>}
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
              <Label htmlFor="time">Time</Label>
              <Select
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                disabled={!barber || !date}
                required
              >
                <Option value="" disabled>Select a Time</Option>
                {barber && date && schedule[barber] && schedule[barber][date] ? (
                  schedule[barber][date].map((t, index) => (
                    <Option key={index} value={t}>
                      {t}
                    </Option>
                  ))
                ) : (
                  <Option value="" disabled>No times available</Option>
                )}
              </Select>
            </FormGroup>
            {barber && date && (!schedule[barber] || !schedule[barber][date] || schedule[barber][date].length === 0) && (
              <AvailabilityMessage>
                Sorry, no time slots are available for {barber} on {date}. The current schedule is only for September 1st-3rd, 2025.
              </AvailabilityMessage>
            )}
            <SubmitButton disabled={!isFormValid}>Book Now</SubmitButton>
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

        {modalState.isOpen && modalState.service && (
          <ModalOverlay onClick={handleCloseModal}>
            <ModalContent onClick={e => e.stopPropagation()}>
              <ModalCloseButton onClick={handleCloseModal}>&times;</ModalCloseButton>
              <ModalTitle>{modalState.service.name}</ModalTitle>
              <ModalDescription>{modalState.service.description}</ModalDescription>
              <Button as="button" onClick={handleCloseModal}>Close</Button>
            </ModalContent>
          </ModalOverlay>
        )}
      </Container>
    );
  }
  
  export default App;
  

