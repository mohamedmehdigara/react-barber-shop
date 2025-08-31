import React, { useState, useEffect } from 'react';
import { SectionContainer, SectionTitle, ReviewSlider, SliderButton, ReviewCard, Stars, ReviewText, ReviewAuthor, ReviewFormContainer, FormGroup, Label, Input, TextArea, RatingStars, SubmitButton } from '../styled';
import { FaStar } from 'react-icons/fa';

const ReviewSection = ({ theme, allReviews, currentReviewIndex, setCurrentReviewIndex, setSubmittedReviews }) => {
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (allReviews.length > 0) {
        setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % allReviews.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [allReviews.length, setCurrentReviewIndex]);

  const handleNextReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % allReviews.length);
  };

  const handlePrevReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex - 1 + allReviews.length) % allReviews.length);
  };

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} color={i < count ? theme.primary : theme.border} />
    ));
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

  const isReviewFormValid = reviewName && reviewText && reviewRating > 0;

  return (
    <SectionContainer theme={theme}>
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
      <ReviewFormContainer theme={theme}>
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
                  style={{ color: reviewRating >= star ? theme.primary : theme.border }}
                />
              ))}
            </RatingStars>
          </FormGroup>
          <SubmitButton theme={theme} disabled={!isReviewFormValid}>Submit Review</SubmitButton>
        </form>
      </ReviewFormContainer>
    </SectionContainer>
  );
};

export default ReviewSection;