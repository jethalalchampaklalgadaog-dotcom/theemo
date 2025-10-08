import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PassengerDetailsPage = ({ bookingData }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [idProof, setIdProof] = useState(null);
  const navigate = useNavigate();
  
  // The location state will hold all booking details passed from App.js
  const finalBookingData = { ...bookingData, passengerName: name, passengerAge: age };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !age || !idProof) {
      alert('Please fill all details and upload an ID proof.');
      return;
    }
    // In a real app, you would upload the file. Here we just simulate.
    console.log("Booking with passenger details:", finalBookingData);
    navigate('/confirmation', { state: finalBookingData });
  };

  return (
    <div className="details-container">
      <h2>Enter Passenger Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Full Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Age</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Upload Identity Proof (e.g., Aadhaar, License)</label>
          <input type="file" onChange={(e) => setIdProof(e.target.files[0])} required />
        </div>
        <button type="submit" className="btn" style={{marginTop: '2rem'}}>Confirm Cash Booking</button>
      </form>
    </div>
  );
};

export default PassengerDetailsPage;