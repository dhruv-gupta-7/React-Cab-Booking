import React, { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const cabType = queryParams.get("type");
  const cabPrice = queryParams.get("price");
  const pickupLocation = queryParams.get("pickup");
  const dropoffLocation = queryParams.get("dropoff");

  const [passengers, setPassengers] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [passengersError, setPassengersError] = useState("");

  const validatePassengers = (value) => {
    if (!value) {
      setPassengersError("Number of passengers is required.");
      return false;
    }
    const passengersCount = parseInt(value, 10);
    if (isNaN(passengersCount) || passengersCount <= 0) {
      setPassengersError("Number of passengers must be a positive integer.");
      return false;
    }
    setPassengersError("");
    return true;
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault(); 

    if (validatePassengers(passengers)) {
      setBookingConfirmed(true);
    }
  };

  return (
    <Container
      sx={{
        marginLeft: "auto",
        "& .MuiOutlinedInput-input": {
          color: "white", 
        },
        "& .MuiInputLabel-root": {
          color: "white", 
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "white", 
          },
        },
        "& .MuiAutocomplete-inputRoot": {
          color: "white", 
          "& fieldset": {
            borderColor: "white",
          },
        },
      }}
      maxWidth="md"
      style={{ marginTop: "100px" }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Confirm Your Booking
      </Typography>
      <Typography mt={"40px"} variant="h6" gutterBottom>
        Selected Cab Type: {cabType}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Price: {cabPrice}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Pickup Location: {pickupLocation}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Drop-off Location: {dropoffLocation}
      </Typography>
      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Number of Passengers: {passengers}
      </Typography>
      {bookingConfirmed ? (
        <div>
          <Typography
            variant="h5"
            style={{ marginTop: "20px", color: "green" }}
          >
            Booking Confirmed! Thank you for using our service.
          </Typography>
        </div>
      ) : (
        <form onSubmit={handleConfirmBooking}>
          <TextField
            label="Number of Passengers"
            fullWidth
            margin="normal"
            variant="outlined"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            error={Boolean(passengersError)}
            helperText={passengersError}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Confirm Booking
          </Button>
        </form>
      )}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: "20px" }}
        onClick={() => navigate("/")}
      >
        Back to Homepage
      </Button>
    </Container>
  );
};

export default BookingPage;
