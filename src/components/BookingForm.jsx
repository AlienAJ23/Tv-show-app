import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BookingForm.css';

const BookingForm = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    
    axios.get(`https://api.tvmaze.com/shows/${id}`)
      .then(response => {
        setShow(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching additional details:', error);
        setLoading(false);
      });
  }, [id]);

  const handleBooking = () => {
    if (!bookingDetails.name || !bookingDetails.email) {
      alert('Please fill in all fields before booking.');
      return;
    }

    
    axios.post(' https://api.tvmaze.com/bookings', {
      showId: id,
      movieName: show.name,
      userName: bookingDetails.name,
      userEmail: bookingDetails.email,
    })
    .then(response => {
      alert('Booking successful!');
    })
    .catch(error => {
      console.error('Error booking:', error);
      alert('Error occurred while booking. Please try again.');
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="booking-form-container">
      <h1>Booking Form</h1>
      {loading && <p>Loading...</p>}
      {!loading && show && (
        <form>
          <label>Movie Name:</label>
          <input type="text" value={show.name} readOnly />

          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={bookingDetails.name}
            onChange={handleInputChange}
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={bookingDetails.email}
            onChange={handleInputChange}
          />
          
          <button type="button" onClick={handleBooking}>Book Now</button>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
