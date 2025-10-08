// src/App.js

import React, { useState } from 'react';
import BookingPanel from './components/booking/BookingPanel';
import MapComponent from './components/map/MapComponent';
// --- DELETE THIS LINE ---
// import Navbar from './components/layout/Navbar'; 
import LoginPage from './pages/LoginPage';
import './styles/App.css';

function App() {
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);
  const [route, setRoute] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <>
      <div className="app-layout">
        <BookingPanel setPickupLocation={setPickupLocation} setDropoffLocation={setDropoffLocation} setRoute={setRoute} />
        <div className="map-container-full">
          {/* --- DELETE THE <Navbar /> COMPONENT FROM HERE --- */}
          <MapComponent pickupLocation={pickupLocation} dropoffLocation={dropoffLocation} route={route} />
        </div>
        
        <button className="logout-button-bottom-right" onClick={() => setIsLoggedIn(false)}>
          Logout
        </button>

      </div>
    </>
  );
}

export default App;