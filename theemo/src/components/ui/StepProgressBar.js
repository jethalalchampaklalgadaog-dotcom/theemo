import React from 'react';

const StepProgressBar = ({ steps, currentStep }) => {
  return (
    <div className="step-progress">
      {steps.map((step, index) => (
        <div key={index} className={`step-progress-item ${currentStep >= index + 1 ? 'is-active' : ''}`}>
          {step}
        </div>
      ))}
    </div>
  );
};

export default StepProgressBar;