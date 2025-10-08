import React from 'react';

const CarCard = ({ car, isSelected, onSelect }) => {
  return (
    <div className={`car-card ${isSelected ? 'selected' : ''}`} onClick={() => onSelect(car)}>
      <img src={car.imageUrl} alt={`${car.make} ${car.model}`} />
      <div className="car-details">
        <h4>{car.make} {car.model}</h4>
        <p>{car.type}</p>
      </div>
      <div className="price-display">
        {car.totalCost && <h4>₹{car.totalCost.toLocaleString('en-IN')}</h4>}
      </div>
    </div>
  );
};

export default CarCard;