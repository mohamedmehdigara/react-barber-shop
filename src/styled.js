import styled, { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const themes = {
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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => themes[props.theme].background};
  color: ${props => themes[props.theme].text};
  font-family: 'Inter', sans-serif;
  transition: background-color 0.5s ease, color 0.5s ease;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  background-color: ${props => themes[props.theme].cardBackground};
  box-shadow: 0 4px 6px ${props => themes[props.theme].shadow};
  transition: background-color 0.5s ease;
`;

export const Title = styled.h1`
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

export const ThemeToggle = styled.button`
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

export const HeroSectionContainer = styled.section`
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

export const HeroText = styled.p`
  font-size: 1.5rem;
  font-style: italic;
  margin-top: 1rem;
  color: ${props => themes[props.theme].textSecondary};
  max-width: 600px;
`;

export const SectionContainer = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background-color: ${props => themes[props.theme].background};
  animation: ${fadeIn} 1s ease-out;
  transition: background-color 0.5s ease;
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: ${props => themes[props.theme].primary};
  margin-bottom: 2rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Card = styled.div`
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

export const Icon = styled.div`
  font-size: 3rem;
  color: ${props => themes[props.theme].primary};
  margin-bottom: 1rem;
`;

export const Name = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => themes[props.theme].text};
`;

export const Price = styled.p`
  font-size: 1.2rem;
  font-style: italic;
  color: ${props => themes[props.theme].muted};
`;

export const Button = styled.a`
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

export const ViewDetailsButton = styled(Button).attrs({ as: 'button' })`
  font-size: 0.8rem;
  padding: 0.6rem 1.2rem;
  margin-top: 1rem;
`;

export const ReviewSlider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

export const ReviewCard = styled.div`
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

export const SliderButton = styled.button`
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

export const ReviewText = styled.p`
  font-style: italic;
  margin: 1rem 0;
  color: ${props => themes[props.theme].textSecondary};
`;

export const ReviewAuthor = styled.p`
  font-weight: 600;
  color: ${props => themes[props.theme].primary};
`;

export const Stars = styled.div`
  color: ${props => themes[props.theme].primary};
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

export const Form = styled.form`
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

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: ${props => themes[props.theme].text};
`;

export const Input = styled.input`
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

export const TextArea = styled.textarea`
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

export const Select = styled.select`
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

export const Option = styled.option`
  background-color: ${props => themes[props.theme].background};
  color: ${props => themes[props.theme].text};
`;

export const SubmitButton = styled(Button).attrs({ as: 'button', type: 'submit' })`
  width: 100%;
  border: none;
  cursor: pointer;
  margin-top: 1rem;
  ${props => props.disabled && `
    background-color: #555;
    cursor: not-allowed;
  `}
`;

export const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

export const SuccessMessage = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: #1f4e38;
  color: #d1e7dd;
  border-radius: 8px;
  text-align: center;
`;

export const AvailabilityMessage = styled.p`
  color: ${props => themes[props.theme].primary};
  font-size: 0.9rem;
  text-align: left;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
  font-style: italic;
`;

export const AboutText = styled.p`
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.6;
  font-size: 1.1rem;
  color: ${props => themes[props.theme].textSecondary};
`;

export const BarberCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background-color: ${props => themes[props.theme].cardBackground};
  border-radius: 12px;
  box-shadow: 0 4px 15px ${props => themes[props.theme].shadow};
`;

export const BarberImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${props => themes[props.theme].primary};
  margin-bottom: 1rem;
`;

export const BarberName = styled.h3`
  font-size: 1.5rem;
  color: ${props => themes[props.theme].primary};
  margin-bottom: 0.5rem;
`;

export const BarberBio = styled.p`
  font-style: italic;
  color: ${props => themes[props.theme].muted};
  line-height: 1.4;
`;

export const PriceCalculatorCard = styled(Card)`
  background-color: ${props => themes[props.theme].cardBackground};
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
`;

export const PriceTitle = styled.h3`
  font-size: 1.5rem;
  color: ${props => themes[props.theme].primary};
  margin-bottom: 1rem;
`;

export const ServiceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const ServiceLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;
  cursor: pointer;
  color: ${props => themes[props.theme].text};
`;

export const TotalPrice = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => themes[props.theme].text};
  margin-top: 1.5rem;
  text-align: center;
  border-top: 2px solid ${props => themes[props.theme].border};
  padding-top: 1rem;
`;

export const Footer = styled.footer`
  text-align: center;
  padding: 1.5rem;
  background-color: ${props => themes[props.theme].cardBackground};
  margin-top: auto;
  color: ${props => themes[props.theme].muted};
  font-size: 0.9rem;
`;

export const ModalOverlay = styled.div`
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

export const ModalContent = styled.div`
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

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${props => themes[props.theme].primary};
  cursor: pointer;
`;

export const ModalTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: ${props => themes[props.theme].primary};
  margin-bottom: 1rem;
`;

export const ModalDescription = styled.p`
  font-size: 1.1rem;
  color: ${props => themes[props.theme].textSecondary};
  line-height: 1.6;
  margin-bottom: 2rem;
`;

export const HaircutImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
  cursor: pointer;
`;

export const FavoriteButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.isFavorite ? 'red' : themes[props.theme].primary};
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.2s ease;
  margin-top: 1rem;
`;

export const FavoriteButtonInModal = styled(FavoriteButton)`
  position: absolute;
  top: 1rem;
  left: 1rem;
`;

export const ReviewFormContainer = styled.div`
  background-color: ${props => themes[props.theme].cardBackground};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px ${props => themes[props.theme].shadow};
  max-width: 600px;
  margin: 2rem auto 0;
`;

export const RatingStars = styled.div`
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
