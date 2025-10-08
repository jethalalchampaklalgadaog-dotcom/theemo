import React, { useState } from 'react'; // <-- useContext removed as it's not needed here anymore
import MapComponent from '../components/map/MapComponent';
import StepProgressBar from '../components/ui/StepProgressBar';
import CarCard from '../components/ui/CarCard';
import Navbar from '../components/layout/Navbar';
import { carData } from '../data/carData';
import { getRouteDetails } from '../api/orsService';

const steps = ["Pickup", "Drop-off", "Date", "Price", "Confirm"];

const HomePage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [bookingDetails, setBookingDetails] = useState({
        pickupLocation: null,
        dropoffLocation: null,
        pickupDateTime: '',
        dropoffDateTime: '',
        selectedCar: null,
        distance: 0,
        carsWithPrices: [],
    });
    const [loading, setLoading] = useState(false);

    // const { logout } = useContext(AuthContext); // <-- This line is removed

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);

    const handleMapClick = (latlng) => {
        if (currentStep === 1) setBookingDetails({ ...bookingDetails, pickupLocation: latlng });
        if (currentStep === 2) setBookingDetails({ ...bookingDetails, dropoffLocation: latlng });
        nextStep();
    };

    const handleDateChange = (e) => {
        setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
    };

    const calculatePriceAndProceed = async () => {
        if (!bookingDetails.pickupDateTime || !bookingDetails.dropoffDateTime) {
            alert("Please select both pickup and drop-off dates."); return;
        }
        setLoading(true);
        try {
            const { distance } = await getRouteDetails(bookingDetails.pickupLocation, bookingDetails.dropoffLocation);
            const pickupDate = new Date(bookingDetails.pickupDateTime);
            const dropoffDate = new Date(bookingDetails.dropoffDateTime);
            const durationMillis = dropoffDate - pickupDate;
            if (durationMillis <= 0) {
                alert("Drop-off date must be after pickup date.");
                setLoading(false);
                return;
            }
            const numberOfDays = Math.ceil(durationMillis / (1000 * 60 * 60 * 24));
            const platformFee = 299;
            const carsWithPrices = carData.map(car => {
                const baseCost = car.baseRatePerDay * numberOfDays;
                const distanceCost = car.perKmCharge * distance;
                const subtotal = baseCost + distanceCost + platformFee;
                const gst = subtotal * 0.18;
                const totalCost = Math.round(subtotal + gst);
                return { ...car, totalCost };
            });
            setBookingDetails({ ...bookingDetails, distance, carsWithPrices });
            nextStep();
        } catch (error) {
            alert("Could not calculate price. Please try again.");
        }
        setLoading(false);
    };

    const renderStepContent = () => {
        // ... (This part of the code is correct and does not need to be changed)
        switch (currentStep) {
            case 1: return <MapComponent onMapClick={handleMapClick} prompt="Step 1: Click to set PICKUP location" />;
            case 2: return <MapComponent location={bookingDetails.pickupLocation} onMapClick={handleMapClick} prompt="Step 2: Click to set DROP-OFF location" />;
            case 3:
                return (
                    <div>
                        <h3>Step 3: Select Date & Time</h3>
                        <div className="form-group" style={{marginTop: '2rem'}}>
                            <label>Pickup Date & Time</label>
                            <input type="datetime-local" name="pickupDateTime" value={bookingDetails.pickupDateTime} onChange={handleDateChange} />
                        </div>
                        <div className="form-group" style={{marginTop: '1rem'}}>
                            <label>Drop-off Date & Time</label>
                            <input type="datetime-local" name="dropoffDateTime" value={bookingDetails.dropoffDateTime} onChange={handleDateChange} />
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div>
                        <h3>Step 4: Choose Your Ride & See the Price</h3>
                        <div className="car-list">
                            {bookingDetails.carsWithPrices.map(car => (
                                <CarCard key={car.id} car={car} isSelected={bookingDetails.selectedCar?.id === car.id} onSelect={(car) => setBookingDetails({...bookingDetails, selectedCar: car})}/>
                            ))}
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="booking-summary">
                        <h3>Booking Confirmed!</h3>
                        <p>Your ride is booked. Please pay the driver at pickup.</p>
                        <p>Car: <span>{bookingDetails.selectedCar?.make} {bookingDetails.selectedCar?.model}</span></p>
                        <p>Pickup: <span>{new Date(bookingDetails.pickupDateTime).toLocaleString('en-IN')}</span></p>
                        <p>Drop-off: <span>{new Date(bookingDetails.dropoffDateTime).toLocaleString('en-IN')}</span></p>
                        <h3 className="total-price">Total: ₹{bookingDetails.selectedCar?.totalCost.toLocaleString('en-IN')}</h3>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <>
            <Navbar />
            <main className="app-container">
                 <div className="booking-wizard">
                    <StepProgressBar steps={steps} currentStep={currentStep} />
                    <div className="step-container">{renderStepContent()}</div>
                    <div className="nav-buttons">
                        {currentStep > 1 && currentStep < 5 ? (<button className="btn btn-secondary" onClick={prevStep}>Back</button>) : (<div></div>)}
                        {currentStep === 3 && <button className="btn" onClick={calculatePriceAndProceed} disabled={loading}>{loading ? "Calculating..." : "See Prices"}</button>}
                        {currentStep === 4 && <button className="btn" onClick={nextStep} disabled={!bookingDetails.selectedCar}>Confirm Booking</button>}
                    </div>
                </div>
            </main>
        </>
    );
};

export default HomePage;