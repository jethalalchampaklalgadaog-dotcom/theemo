// src/components/booking/BookingPanel.js

import React, { useState, useEffect } from 'react';
import { carData } from '../../data/carData';
import { getRouteDetails } from '../../api/orsService';
import CarCard from '../ui/CarCard';
import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';

const BookingPanel = ({ setPickupLocation, setDropoffLocation, setRoute }) => {
    // All existing state remains the same...
    const [pickup, setPickup] = useState(null);
    const [dropoff, setDropoff] = useState(null);
    const [pickupText, setPickupText] = useState("");
    const [dropoffText, setDropoffText] = useState("");
    const [pickupDateTime, setPickupDateTime] = useState('');
    const [dropoffDateTime, setDropoffDateTime] = useState('');
    const [carsWithPrices, setCarsWithPrices] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassengerDetails, setShowPassengerDetails] = useState(false);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);
    const [passengerName, setPassengerName] = useState('');
    const [passengerPhone, setPassengerPhone] = useState('');
    const [passengerEmail, setPassengerEmail] = useState('');

    // All existing functions remain the same...
    useEffect(() => {
        const calculate = async () => {
            if (pickup && dropoff && pickupDateTime && dropoffDateTime) {
                setLoading(true); setCarsWithPrices([]); setSelectedCar(null);
                try {
                    const { route, distance } = await getRouteDetails(pickup, dropoff);
                    setRoute(route);
                    const pDate = new Date(pickupDateTime); const dDate = new Date(dropoffDateTime);
                    const days = Math.ceil((dDate - pDate) / (1000 * 60 * 60 * 24));
                    if (days <= 0) { alert("Drop-off date must be after pickup date."); setLoading(false); return; }
                    const platformFee = 299;
                    const pricedCars = carData.map(car => {
                        const baseCost = car.baseRatePerDay * days;
                        const distanceCost = car.perKmCharge * distance;
                        const subtotal = baseCost + distanceCost + platformFee;
                        const gst = subtotal * 0.18;
                        const totalCost = Math.round(subtotal + gst);
                        return { ...car, totalCost };
                    });
                    setCarsWithPrices(pricedCars);
                } catch (error) { alert("Could not calculate your trip. Please check locations."); } finally { setLoading(false); }
            }
        };
        calculate();
    }, [pickup, dropoff, pickupDateTime, dropoffDateTime, setRoute]);
    
    const handleGeocode = async (address, type) => {
        if (!address) return; setLoading(true);
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
            const data = await response.json();
            if (data && data[0]) {
                const coords = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
                if (type === 'pickup') { setPickup(coords); setPickupLocation(coords); }
                else { setDropoff(coords); setDropoffLocation(coords); }
            } else { alert('Location not found. Please be more specific (e.g., "Mumbai, India").'); }
        } catch (error) { alert('Error finding location.'); } finally { setLoading(false); }
    };
    
    const handleKeyPress = (event, type) => { if (event.key === 'Enter') { handleGeocode(event.target.value, type); }};
    const handleConfirmBooking = () => { if (!passengerName || !passengerPhone || !passengerEmail) { alert("Please fill in all passenger details."); return; } setBookingConfirmed(true); };

    // --- RENDER LOGIC ---

    if (bookingConfirmed) {
        return (
            <div className="booking-panel" id="confirmation-panel">
                <div className="panel-header"><h1>Booking Confirmed!</h1></div>
                <div className="ticket-container" id="printable-ticket">
                    <div className="ticket-stamp">Booking Confirmed</div>
                    <div className="ticket-header"><h2>Theemo</h2><p>Your Booking Confirmation</p></div>
                    <div className="ticket-details">
                        <div className="ticket-car-image-container"><img src={selectedCar.imageUrl} alt={`${selectedCar.make} ${selectedCar.model}`} className="ticket-car-image"/></div>
                        <p><strong>Passenger:</strong> <span>{passengerName}</span></p>
                        <p><strong>Contact:</strong> <span>{passengerPhone}</span></p>
                        <hr />
                        <p><strong>Car:</strong> <span>{selectedCar.make} {selectedCar.model} ({selectedCar.type})</span></p>
                        <p><strong>Pickup:</strong> <span>{pickupText}</span></p>
                        <p><strong>Drop-off:</strong> <span>{dropoffText}</span></p>
                        <p><strong>From:</strong> <span>{new Date(pickupDateTime).toLocaleString('en-IN')}</span></p>
                        {/* --- CORRECTED: The "To" date is now displayed --- */}
                        <p><strong>To:</strong> <span>{new Date(dropoffDateTime).toLocaleString('en-IN')}</span></p>
                        <hr />
                        {/* --- CORRECTED: The price is now displayed --- */}
                        <div className="ticket-price">
                            <p>Total Amount (incl. taxes)</p>
                            <h3>₹{selectedCar.totalCost.toLocaleString('en-IN')}</h3>
                        </div>
                    </div>
                    {/* --- CORRECTED: The footer is now displayed --- */}
                    <div className="ticket-footer"><p>Thank You for choosing Theemo - The Car Rental Service</p></div>
                </div>
                <div className="confirmation-buttons">
                    <button className="btn btn-secondary" onClick={() => window.print()}>Print Ticket</button>
                    <button className="btn" onClick={() => window.location.reload()}>New Booking</button>
                </div>
            </div>
        );
    }

    if (showPassengerDetails) {
        // This part remains unchanged
        return (
            <div className="booking-panel">
                <div className="panel-header"><h1>Passenger Details</h1></div>
                <div className="passenger-details-form" style={{flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <div className="input-group"><label>Full Name</label><div style={{position:'relative'}}><FaUser className="input-icon" /><input type="text" placeholder="Enter your full name" value={passengerName} onChange={(e) => setPassengerName(e.target.value)} /></div></div>
                    <div className="input-group"><label>Phone Number</label><div style={{position:'relative'}}><FaPhone className="input-icon" /><input type="tel" placeholder="Enter your phone number" value={passengerPhone} onChange={(e) => setPassengerPhone(e.target.value)} /></div></div>
                    <div className="input-group"><label>Email Address</label><div style={{position:'relative'}}><FaEnvelope className="input-icon" /><input type="email" placeholder="Enter your email" value={passengerEmail} onChange={(e) => setPassengerEmail(e.target.value)} /></div></div>
                </div>
                <div className="form-nav-buttons"><button className="btn btn-secondary" onClick={() => setShowPassengerDetails(false)}>Back</button><button className="btn" onClick={handleConfirmBooking}>Confirm Booking</button></div>
            </div>
        );
    }

    // This part also remains unchanged
    return (
        <div className="booking-panel">
            {loading && <div className="loading-overlay"><div className="spinner"></div></div>}
            <div className="panel-header"><h1> RentRide-Vehicle Rental System</h1></div>
            <div className="input-group"><label>Pickup Location</label><div style={{position:'relative'}}><FaMapMarkerAlt className="input-icon" /><input type="text" placeholder="e.g., Mumbai Airport" value={pickupText} onChange={(e) => setPickupText(e.target.value)} onKeyPress={(e) => handleKeyPress(e, 'pickup')} /></div></div>
            <div className="input-group"><label>Drop-off Location</label><div style={{position:'relative'}}><FaMapMarkerAlt className="input-icon" /><input type="text" placeholder="e.g., Pune Station" value={dropoffText} onChange={(e) => setDropoffText(e.target.value)} onKeyPress={(e) => handleKeyPress(e, 'dropoff')} /></div></div>
            <div className="input-group"><label>Pickup Date & Time</label><div style={{position:'relative'}}><FaCalendarAlt className="input-icon" /><input type="datetime-local" value={pickupDateTime} onChange={(e) => setPickupDateTime(e.target.value)} /></div></div>
            <div className="input-group"><label>Drop-off Date & Time</label><div style={{position:'relative'}}><FaCalendarAlt className="input-icon" /><input type="datetime-local" value={dropoffDateTime} onChange={(e) => setDropoffDateTime(e.target.value)} /></div></div>
            {carsWithPrices.length > 0 && (<div className="results-container"><h3>Available Rides</h3><div className="car-list">{carsWithPrices.map(car => (<CarCard key={car.id} car={car} isSelected={selectedCar?.id === car.id} onSelect={setSelectedCar} />))}</div></div>)}
            <button className="btn" onClick={() => setShowPassengerDetails(true)} disabled={!selectedCar} style={{marginTop: 'auto'}}>Book Now</button>
        </div>
    );
};

export default BookingPanel;