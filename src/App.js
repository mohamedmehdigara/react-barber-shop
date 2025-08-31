import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaCut, FaCrown, FaStar, FaSun, FaMoon, FaHeart } from 'react-icons/fa';

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

// Theme colors
const themes = {
  dark: {
    background: '#1a1a1a',
    cardBackground: '#0d0d0d',
    primary: '#ffc107',
    text: '#f0f0f0',
    textSecondary: '#e0e0e0',
    muted: '#888',
    shadow: 'rgba(0, 0, 0, 0.4)',
    border: '#333',
  },
  light: {
    background: '#f5f5f5',
    cardBackground: '#fff',
    primary: '#5d5d5d',
    text: '#2c2c2c',
    textSecondary: '#4a4a4a',
    muted: '#aaa',
    shadow: 'rgba(0, 0, 0, 0.1)',
    border: '#ddd',
  },
};

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => themes[props.theme].background};
  color: ${props => themes[props.theme].text};
  font-family: 'Inter', sans-serif;
  transition: background-color 0.5s ease, color 0.5s ease;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  background-color: ${props => themes[props.theme].cardBackground};
  box-shadow: 0 4px 6px ${props => themes[props.theme].shadow};
  transition: background-color 0.5s ease;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: ${props => themes[props.theme].primary};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${props => themes[props.theme].primary};
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: ${props => props.theme === 'dark' ? '#fff' : '#000'};
  }
`;

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
  color: ${props => themes[props.theme].textSecondary};
  max-width: 600px;
`;

const Section = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background-color: ${props => themes[props.theme].background};
  animation: ${fadeIn} 1s ease-out;
  transition: background-color 0.5s ease;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: ${props => themes[props.theme].primary};
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  background-color: ${props => themes[props.theme].cardBackground};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px ${props => themes[props.theme].shadow};
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.5s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 20px ${props => themes[props.theme].shadow};
  }
`;

const Icon = styled.div`
  font-size: 3rem;
  color: ${props => themes[props.theme].primary};
  margin-bottom: 1rem;
`;

const Name = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => themes[props.theme].text};
`;

const Price = styled.p`
  font-size: 1.2rem;
  font-style: italic;
  color: ${props => themes[props.theme].muted};
`;

const Button = styled.a`
  display: inline-block;
  background-color: ${props => themes[props.theme].primary};
  color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#fff'};
  padding: 0.8rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#e0a800' : '#4a4a4a'};
    transform: scale(1.05);
  }
`;

const ViewDetailsButton = styled(Button).attrs({ as: 'button' })`
  font-size: 0.8rem;
  padding: 0.6rem 1.2rem;
  margin-top: 1rem;
`;

const ReviewSlider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const ReviewCard = styled.div`
  background-color: ${props => themes[props.theme].cardBackground};
  padding: 1.5rem;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 4px 15px ${props => themes[props.theme].shadow};
  width: 100%;
  max-width: 500px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: opacity 0.5s ease, background-color 0.5s ease;
`;

const SliderButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  color: ${props => themes[props.theme].primary};
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;
  &:hover {
    transform: scale(1.1);
    color: ${props => themes[props.theme].text};
  }
`;

const ReviewText = styled.p`
  font-style: italic;
  margin: 1rem 0;
  color: ${props => themes[props.theme].textSecondary};
`;

const ReviewAuthor = styled.p`
  font-weight: 600;
  color: ${props => themes[props.theme].primary};
`;

const Stars = styled.div`
  color: ${props => themes[props.theme].primary};
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: ${props => themes[props.theme].cardBackground};
  border-radius: 12px;
  box-shadow: 0 4px 15px ${props => themes[props.theme].shadow};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: ${props => themes[props.theme].text};
`;

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid ${props => themes[props.theme].border};
  background-color: ${props => themes[props.theme].background};
  color: ${props => themes[props.theme].text};
  &:focus {
    outline: none;
    border-color: ${props => themes[props.theme].primary};
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid ${props => themes[props.theme].border};
  background-color: ${props => themes[props.theme].background};
  color: ${props => themes[props.theme].text};
  min-height: 100px;
  &:focus {
    outline: none;
    border-color: ${props => themes[props.theme].primary};
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid ${props => themes[props.theme].border};
  background-color: ${props => themes[props.theme].background};
  color: ${props => themes[props.theme].text};
  &:focus {
    outline: none;
    border-color: ${props => themes[props.theme].primary};
  }
`;

const Option = styled.option`
  background-color: ${props => themes[props.theme].background};
  color: ${props => themes[props.theme].text};
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
  color: ${props => themes[props.theme].primary};
  font-size: 0.9rem;
  text-align: left;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
  font-style: italic;
`;

const AboutSection = styled(Section)`
  background-color: ${props => themes[props.theme].background};
`;

const AboutText = styled.p`
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.6;
  font-size: 1.1rem;
  color: ${props => themes[props.theme].textSecondary};
`;

const BarberCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background-color: ${props => themes[props.theme].cardBackground};
  border-radius: 12px;
  box-shadow: 0 4px 15px ${props => themes[props.theme].shadow};
`;

const BarberImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${props => themes[props.theme].primary};
  margin-bottom: 1rem;
`;

const BarberName = styled.h3`
  font-size: 1.5rem;
  color: ${props => themes[props.theme].primary};
  margin-bottom: 0.5rem;
`;

const BarberBio = styled.p`
  font-style: italic;
  color: ${props => themes[props.theme].muted};
  line-height: 1.4;
`;

const PriceCalculatorSection = styled(Section)`
  background-color: ${props => themes[props.theme].background};
`;

const PriceCalculatorCard = styled(Card)`
  background-color: ${props => themes[props.theme].cardBackground};
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
`;

const PriceTitle = styled.h3`
  font-size: 1.5rem;
  color: ${props => themes[props.theme].primary};
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
  color: ${props => themes[props.theme].text};
`;

const TotalPrice = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => themes[props.theme].text};
  margin-top: 1.5rem;
  text-align: center;
  border-top: 2px solid ${props => themes[props.theme].border};
  padding-top: 1rem;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 1.5rem;
  background-color: ${props => themes[props.theme].cardBackground};
  margin-top: auto;
  color: ${props => themes[props.theme].muted};
  font-size: 0.9rem;
`;

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
  background-color: ${props => themes[props.theme].cardBackground};
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
  color: ${props => themes[props.theme].primary};
  cursor: pointer;
`;

const ModalTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: ${props => themes[props.theme].primary};
  margin-bottom: 1rem;
`;

const ModalDescription = styled.p`
  font-size: 1.1rem;
  color: ${props => themes[props.theme].textSecondary};
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const HaircutImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const FavoriteButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.isFavorite ? 'red' : props.theme === 'dark' ? '#ffc107' : '#5d5d5d'};
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.2s ease;
  margin-top: 1rem;
`;

const FavoriteButtonInModal = styled(FavoriteButton)`
  position: absolute;
  top: 1rem;
  left: 1rem;
`;

const ReviewForm = styled.div`
  background-color: ${props => themes[props.theme].cardBackground};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px ${props => themes[props.theme].shadow};
  max-width: 600px;
  margin: 2rem auto 0;
`;

const RatingStars = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 1.5rem;
  color: #ddd;
  cursor: pointer;
  margin-bottom: 1rem;

  svg {
    color: ${props => props.theme === 'dark' ? '#ffc107' : '#5d5d5d'};
  }
`;

function App() {
  const [theme, setTheme] = useState('dark');
  const [name, setName] = useState('');
  const [barber, setBarber] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [submittedReviews, setSubmittedReviews] = useState([]);
  const [nameError, setNameError] = useState('');
  const [dateError, setDateError] = useState('');
  const [modalState, setModalState] = useState({ isOpen: false, service: null });
  const [galleryModalState, setGalleryModalState] = useState({ isOpen: false, haircut: null });
  const [favorites, setFavorites] = useState([]);
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

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

  const initialReviews = [
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

  const haircuts = [
    {
      id: 1,
      name: "Classic Fade",
      image: "https://placehold.co/300x200/1f1f1f/ffffff?text=Classic+Fade",
      description: "A timeless, low-maintenance haircut with a smooth transition from short to long. Perfect for a sharp, clean look.",
    },
    {
      id: 2,
      name: "Pompadour",
      image: "https://placehold.co/300x200/1f1f1f/ffffff?text=Pompadour",
      description: "A stylish and bold haircut featuring short sides and a long top that is swept upwards and backward. Requires a bit of styling product.",
    },
    {
      id: 3,
      name: "Buzz Cut",
      image: "https://placehold.co/300x200/1f1f1f/ffffff?text=Buzz+Cut",
      description: "The ultimate in simplicity and utility. A uniform length all over, perfect for a no-fuss, clean-cut appearance.",
    },
    {
      id: 4,
      name: "Crew Cut",
      image: "https://placehold.co/300x200/1f1f1f/ffffff?text=Crew+Cut",
      description: "A short, classic haircut that is tapered on the sides and back, with the top slightly longer. A versatile and neat style for any occasion.",
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

  // Combine initial and submitted reviews for the slider
  const allReviews = [...submittedReviews, ...initialReviews];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % allReviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [allReviews.length]);

  const handleNextReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % allReviews.length);
  };

  const handlePrevReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex - 1 + allReviews.length) % allReviews.length);
  };

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} color={i < count ? themes[theme].primary : themes[theme].border} />
    ));
  };

  const validateForm = () => {
    let isValid = true;
    
    if (!name.trim()) {
      setNameError('Full name is required.');
      isValid = false;
    } else {
      setNameError('');
    }

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
      const newSchedule = JSON.parse(JSON.stringify(schedule));
      const availableTimes = newSchedule[barber][date];
      if (availableTimes) {
        newSchedule[barber][date] = availableTimes.filter(slot => slot !== time);
        setSchedule(newSchedule);
      }

      setIsSubmitted(true);
      
      setName('');
      setBarber('');
      setService('');
      setDate('');
      setTime('');
      
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

  const handleOpenGalleryModal = (haircut) => {
    setGalleryModalState({ isOpen: true, haircut });
  };

  const handleCloseGalleryModal = () => {
    setGalleryModalState({ isOpen: false, haircut: null });
  };

  const toggleFavorite = (id) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter(favId => favId !== id);
      } else {
        return [...prevFavorites, id];
      }
    });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewName && reviewText && reviewRating > 0) {
      const newReview = {
        text: reviewText,
        author: reviewName,
        stars: reviewRating,
      };
      setSubmittedReviews(prevReviews => [newReview, ...prevReviews]);
      setReviewName('');
      setReviewText('');
      setReviewRating(0);
    }
  };

  const isFormValid = name && barber && service && date && time && !nameError && !dateError;
  const isReviewFormValid = reviewName && reviewText && reviewRating > 0;

  return (
    <Container theme={theme}>
      <Header theme={theme}>
        <Title theme={theme}>The Gents' Cut</Title>
        <ThemeToggle onClick={toggleTheme} theme={theme}>
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </ThemeToggle>
      </Header>

      <HeroSection theme={theme}>
        <Title theme={theme}>Craftsmanship. Style. Precision.</Title>
        <HeroText theme={theme}>
          Experience the art of grooming in a modern and relaxing atmosphere. We are dedicated to providing the perfect cut and shave.
        </HeroText>
        <Button href="#" theme={theme}>Book Your Appointment</Button>
      </HeroSection>

      <Section theme={theme}>
        <SectionTitle theme={theme}>Our Services</SectionTitle>
        <Grid>
          {services.map((service, index) => (
            <Card key={index} theme={theme}>
              <Icon theme={theme}>{service.icon}</Icon>
              <Name theme={theme}>{service.name}</Name>
              <Price theme={theme}>${service.price}</Price>
              <ViewDetailsButton onClick={() => handleOpenModal(service)} theme={theme}>View Details</ViewDetailsButton>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section theme={theme}>
        <SectionTitle theme={theme}>Haircut Gallery</SectionTitle>
        <Grid>
          {haircuts.map((haircut) => (
            <Card key={haircut.id} theme={theme}>
              <HaircutImage
                src={haircut.image}
                alt={haircut.name}
                onClick={() => handleOpenGalleryModal(haircut)}
              />
              <Name theme={theme}>{haircut.name}</Name>
              <FavoriteButton
                onClick={() => toggleFavorite(haircut.id)}
                isFavorite={favorites.includes(haircut.id)}
                theme={theme}
              >
                <FaHeart />
              </FavoriteButton>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section theme={theme}>
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
      </Section>

      <Section theme={theme}>
        <SectionTitle theme={theme}>What Our Clients Say</SectionTitle>
        <ReviewSlider>
          <SliderButton onClick={handlePrevReview} theme={theme}>&lt;</SliderButton>
          <ReviewCard theme={theme}>
            {allReviews.length > 0 && (
              <>
                <Stars theme={theme}>{renderStars(allReviews[currentReviewIndex].stars)}</Stars>
                <ReviewText theme={theme}>"{allReviews[currentReviewIndex].text}"</ReviewText>
                <ReviewAuthor theme={theme}>- {allReviews[currentReviewIndex].author}</ReviewAuthor>
              </>
            )}
          </ReviewCard>
          <SliderButton onClick={handleNextReview} theme={theme}>&gt;</SliderButton>
        </ReviewSlider>
        <ReviewForm theme={theme}>
          <SectionTitle theme={theme}>Leave a Review</SectionTitle>
          <form onSubmit={handleReviewSubmit}>
            <FormGroup>
              <Label htmlFor="reviewName" theme={theme}>Your Name</Label>
              <Input
                type="text"
                id="reviewName"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                theme={theme}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="reviewText" theme={theme}>Your Review</Label>
              <TextArea
                id="reviewText"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                theme={theme}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label theme={theme}>Your Rating</Label>
              <RatingStars theme={theme}>
                {[1, 2, 3, 4, 5].map(star => (
                  <FaStar
                    key={star}
                    onClick={() => setReviewRating(star)}
                    style={{ color: reviewRating >= star ? themes[theme].primary : themes[theme].border }}
                  />
                ))}
              </RatingStars>
            </FormGroup>
            <SubmitButton theme={theme} disabled={!isReviewFormValid}>Submit Review</SubmitButton>
          </form>
        </ReviewForm>
      </Section>

      <Section theme={theme}>
        <SectionTitle theme={theme}>Book Your Appointment</SectionTitle>
        <Form onSubmit={handleBookingSubmit} theme={theme}>
          {isSubmitted && <SuccessMessage>Booking request sent successfully! We have confirmed your appointment. The time slot is now removed from availability.</SuccessMessage>}
          <FormGroup>
            <Label htmlFor="name" theme={theme}>Full Name</Label>
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
              theme={theme}
            />
            {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="barber" theme={theme}>Choose Your Barber</Label>
            <Select
              id="barber"
              value={barber}
              onChange={(e) => {
                setBarber(e.target.value);
                setTime('');
              }}
              required
              theme={theme}
            >
              <Option value="" disabled theme={theme}>Select a Barber</Option>
              {barbers.map((b, index) => (
                <Option key={index} value={b.name} theme={theme}>
                  {b.name}
                </Option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="date" theme={theme}>Date</Label>
            <Input
              type="date"
              id="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setDateError('');
                setTime('');
              }}
              onBlur={validateForm}
              required
              theme={theme}
            />
            {dateError && <ErrorMessage>{dateError}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="service" theme={theme}>Service</Label>
            <Select
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
              theme={theme}
            >
              <Option value="" disabled theme={theme}>Select a Service</Option>
              {services.map((s, index) => (
                <Option key={index} value={s.name} theme={theme}>
                  {s.name}
                </Option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="time" theme={theme}>Time</Label>
            <Select
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              disabled={!barber || !date}
              required
              theme={theme}
            >
              <Option value="" disabled theme={theme}>Select a Time</Option>
              {barber && date && schedule[barber] && schedule[barber][date] ? (
                schedule[barber][date].map((t, index) => (
                  <Option key={index} value={t} theme={theme}>
                    {t}
                  </Option>
                ))
              ) : (
                <Option value="" disabled theme={theme}>No times available</Option>
              )}
            </Select>
          </FormGroup>
          {barber && date && (!schedule[barber] || !schedule[barber][date] || schedule[barber][date].length === 0) && (
            <AvailabilityMessage theme={theme}>
              Sorry, no time slots are available for {barber} on {date}. The current schedule is only for September 1st-3rd, 2025.
            </AvailabilityMessage>
          )}
          <SubmitButton disabled={!isFormValid} theme={theme}>Book Now</SubmitButton>
        </Form>
      </Section>
        
      <Section theme={theme}>
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
      </Section>
  
      <Footer theme={theme}>
        <p>&copy; 2024 The Gents' Cut. All Rights Reserved.</p>
      </Footer>

      {modalState.isOpen && modalState.service && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={e => e.stopPropagation()} theme={theme}>
            <ModalCloseButton onClick={handleCloseModal} theme={theme}>&times;</ModalCloseButton>
            <ModalTitle theme={theme}>{modalState.service.name}</ModalTitle>
            <ModalDescription theme={theme}>{modalState.service.description}</ModalDescription>
            <Button as="button" onClick={handleCloseModal} theme={theme}>Close</Button>
          </ModalContent>
        </ModalOverlay>
      )}

      {galleryModalState.isOpen && galleryModalState.haircut && (
        <ModalOverlay onClick={handleCloseGalleryModal}>
          <ModalContent onClick={e => e.stopPropagation()} theme={theme}>
            <ModalCloseButton onClick={handleCloseGalleryModal} theme={theme}>&times;</ModalCloseButton>
            <FavoriteButtonInModal
              onClick={() => toggleFavorite(galleryModalState.haircut.id)}
              isFavorite={favorites.includes(galleryModalState.haircut.id)}
              theme={theme}
            >
              <FaHeart />
            </FavoriteButtonInModal>
            <img
              src={galleryModalState.haircut.image}
              alt={galleryModalState.haircut.name}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <ModalTitle theme={theme}>{galleryModalState.haircut.name}</ModalTitle>
            <ModalDescription theme={theme}>{galleryModalState.haircut.description}</ModalDescription>
            <Button as="button" onClick={handleCloseGalleryModal} theme={theme}>Close</Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}
  
export default App;
  


