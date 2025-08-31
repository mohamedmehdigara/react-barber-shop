import React, { useState } from 'react';
import { SectionContainer, SectionTitle, Form, FormGroup, Label, Input, Select, Option, SuccessMessage, AvailabilityMessage, ErrorMessage, SubmitButton } from '../styled';

const BookingForm = ({ theme, schedule, setSchedule, services, barbers, isSubmitted, setIsSubmitted }) => {
  const [name, setName] = useState('');
  const [barber, setBarber] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [nameError, setNameError] = useState('');
  const [dateError, setDateError] = useState('');

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

  const isFormValid = name && barber && service && date && time && !nameError && !dateError;

  return (
    <SectionContainer theme={theme}>
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
    </SectionContainer>
  );
};

export default BookingForm;
