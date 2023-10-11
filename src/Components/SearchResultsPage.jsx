import React, { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const cabData = [
  { type: 'Economy', price: '$20', arrivalTime: '10 minutes' },
  { type: 'Premium', price: '$30', arrivalTime: '8 minutes' },
  { type: 'Luxury', price: '$50', arrivalTime: '5 minutes' },
];

const SearchResultsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get('category');
  const navigate = useNavigate();

  const filteredCabs = selectedCategory
    ? cabData.filter((cab) => cab.type === selectedCategory)
    : cabData;

  const handleBookNow = (cabType, cabPrice) => {
    const searchParams = `type=${cabType}&price=${cabPrice}&pickup=${queryParams.get('pickup')}&dropoff=${queryParams.get('dropoff')}`;
    navigate(`/booking?${searchParams}`);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '100px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Available Cabs
      </Typography>
      {filteredCabs.map((cab, index) => (
        <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <Typography variant="h6">{cab.type} Cab</Typography>
          <Typography>Price: {cab.price}</Typography>
          <Typography>Estimated Arrival Time: {cab.arrivalTime}</Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '10px' }}
            onClick={() => handleBookNow(cab.type, cab.price)}
          >
            Book {cab.type} Cab
          </Button>
        </div>
      ))}
    </Container>
  );
};

export default SearchResultsPage;
