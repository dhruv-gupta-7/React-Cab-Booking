import React, { useState } from 'react';
import { Container, Typography, TextField, Autocomplete, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const cabCategories = ['Economy', 'Premium', 'Luxury'];

const HomePage = () => {
  const navigate = useNavigate();
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const errors = {};
    let isValid = true;

    if (!pickupLocation.trim()) {
      errors.pickupLocation = 'Pickup location is required';
      isValid = false;
    }

    if (!dropoffLocation.trim()) {
      errors.dropoffLocation = 'Drop-off location is required';
      isValid = false;
    }

    if (!selectedCategory) {
      errors.selectedCategory = 'Select a cab category';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSearch = () => {
    if (validateInputs()) {
      const searchParams = `pickup=${pickupLocation}&dropoff=${dropoffLocation}&category=${selectedCategory}`;
      navigate(`/search?${searchParams}`);
    }
  };

  return (
    <Container
      sx={{
        marginLeft: 'auto',
        '& .MuiOutlinedInput-input': {
          color: 'white', 
        },
        '& .MuiInputLabel-root': {
          color: 'white', 
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'white', 
          },
        },
        '& .MuiAutocomplete-inputRoot': {
          color: 'white', 
          '& fieldset': {
            borderColor: 'white', 
          },
        },
      }}
      maxWidth="100vw"
      style={{ marginTop: '100px' }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to Cab Booking Service
      </Typography>
      <TextField
        label="Pickup Location"
        fullWidth
        margin="normal"
        variant="outlined"
        value={pickupLocation}
        onChange={(e) => setPickupLocation(e.target.value)}
        error={!!errors.pickupLocation}
        helperText={errors.pickupLocation}
      />
      <TextField
        label="Drop-off Location"
        fullWidth
        margin="normal"
        variant="outlined"
        style={{ marginBottom: '20px' }}
        value={dropoffLocation}
        onChange={(e) => setDropoffLocation(e.target.value)}
        error={!!errors.dropoffLocation}
        helperText={errors.dropoffLocation}
      />
      <Autocomplete
        options={cabCategories}
        fullWidth
        value={selectedCategory}
        onChange={(event, newValue) => {
          setSelectedCategory(newValue);
          setErrors({ ...errors, selectedCategory: '' });
        }}
        renderInput={(params) => <TextField {...params} label="Select Cab Category" variant="outlined" />}
        error={!!errors.selectedCategory}
        helperText={errors.selectedCategory}
      />
      <Button variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }} onClick={handleSearch}>
        Search Cabs
      </Button>
    </Container>
  );
};

export default HomePage;
