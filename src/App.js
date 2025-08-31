import React, { useState, useEffect } from 'react';
import { Container, Header, Title, ThemeToggle, Footer } from './styled';
import { FaSun, FaMoon } from 'react-icons/fa';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import ServiceModal from './components/ServiceModal';
import GallerySection from './components/GallerySection';
import GalleryModal from './components/GalleryModal';
import PriceCalculatorSection from './components/PriceCalculatorSection';
import ReviewSection from './components/ReviewSection';
import BookingForm from './components/BookingForm';
import BarbersSection from './components/BarbersSection';
import StyleQuiz from './components/StyleQuiz';

function App() {
  const [theme, setTheme] = useState('dark');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [submittedReviews, setSubmittedReviews] = useState([]);
  const [modalState, setModalState] = useState({ isOpen: false, service: null });
  const [galleryModalState, setGalleryModalState] = useState({ isOpen: false, haircut: null });
  const [favorites, setFavorites] = useState([]);
  
  // Data for the app
  const services = [
    { 
      name: "Classic Haircut", 
      price: 30, 
      description: "A traditional haircut tailored to your head and face shape. Our barbers use clippers and scissors to create a precise, clean finish. Includes a wash and style."
    },
    { 
      name: "Hot Towel Shave", 
      price: 25, 
      description: "A luxurious and relaxing hot towel shave. We prepare your skin with hot towels and pre-shave oil, followed by a close shave and a soothing aftershave balm."
    },
    { 
      name: "Beard Trim & Shape", 
      price: 20, 
      description: "Keep your beard looking its best with a professional trim and shape. Our barbers will sculpt your beard to perfection, followed by a final oil treatment."
    },
    { 
      name: "Haircut & Shave Combo", 
      price: 50, 
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
  const allReviews = [...submittedReviews, ...initialReviews];

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

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

  return (
    <Container theme={theme}>
      <Header theme={theme}>
        <Title theme={theme}>The Gents' Cut</Title>
        <ThemeToggle onClick={toggleTheme} theme={theme}>
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </ThemeToggle>
      </Header>

      <HeroSection theme={theme} />
      <ServicesSection services={services} theme={theme} onOpenModal={handleOpenModal} />
      <GallerySection haircuts={haircuts} theme={theme} onOpenModal={handleOpenGalleryModal} onToggleFavorite={toggleFavorite} favorites={favorites} />
      <PriceCalculatorSection services={services} theme={theme} />
      <ReviewSection theme={theme} allReviews={allReviews} currentReviewIndex={currentReviewIndex} setCurrentReviewIndex={setCurrentReviewIndex} setSubmittedReviews={setSubmittedReviews} />
      <BookingForm theme={theme} schedule={schedule} setSchedule={setSchedule} services={services} barbers={barbers} isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} />
      <BarbersSection barbers={barbers} theme={theme} />
      <StyleQuiz theme={theme} haircuts={haircuts} />

  
      <Footer theme={theme}>
        <p>&copy; 2024 The Gents' Cut. All Rights Reserved.</p>
      </Footer>

      {modalState.isOpen && <ServiceModal theme={theme} service={modalState.service} onCloseModal={handleCloseModal} />}
      {galleryModalState.isOpen && <GalleryModal theme={theme} haircut={galleryModalState.haircut} onCloseModal={handleCloseGalleryModal} favorites={favorites} onToggleFavorite={toggleFavorite} />}
    </Container>
  );
}
  
export default App;
  