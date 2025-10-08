import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ConfirmationPage = () => {
  const location = useLocation();
  const bookingData = location.state;

  if (!bookingData) {
    return (
        <div className="confirmation-container">
            <h2>Something went wrong!</h2>
            <p>Booking data not found. Please start a new booking.</p>
            <Link to="/"><button className="btn">Go Home</button></Link>
        </div>
    );
  }

  const { selectedCar, pickupText, dropoffText, pickupDateTime, dropoffDateTime, passengerName, passengerAge } = bookingData;

  return (
    <div className="confirmation-container">
      <h2 className="success">✓ Booking Confirmed!</h2>
      <p style={{textAlign: 'center', color: '#6c757d'}}>Thank you for choosing Theemo. Your ride is scheduled.</p>
      
      <div className="confirmation-summary">
        <div className="summary-item">
          <span className="label">Passenger</span>
          <span className="value">{passengerName} (Age: {passengerAge})</span>
        </div>
        <div className="summary-item">
          <span className="label">Car</span>
          <span className="value">{selectedCar.make} {selectedCar.model} ({selectedCar.type})</span>
        </div>
        <div className="summary-item">
          <span className="label">Pickup</span>
          <span className="value">{pickupText} at {new Date(pickupDateTime).toLocaleString('en-IN')}</span>
        </div>
        <div className="summary-item">
          <span className="label">Drop-off</span>
          <span className="value">{dropoffText} at {new Date(dropoffDateTime).toLocaleString('en-IN')}</span>
        </div>
        <div className="summary-item total">
          <span className="label">Total Amount</span>
          <span className="value">₹{selectedCar.totalCost.toLocaleString('en-IN')}</span>
        </div>
        <div className="summary-item">
          <span className="label">Payment Method</span>
          <span className="value">Pay with Cash at Pickup</span>
        </div>
      </div>

      <div className="confirmation-footer">
        <p>Please be at the pickup location on time. Have a safe journey!</p>
        <Link to="/"><button className="btn" style={{marginTop: '1rem'}}>Book Another Ride</button></Link>
      </div>
    </div>
  );
};

export default ConfirmationPage;