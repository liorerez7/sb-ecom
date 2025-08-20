import { StepLabel } from '@mui/material';
import React, { useState } from 'react'
import { Step, Stepper } from '@mui/material';
import { AddressInfo } from './AddressInfo';

function Checkout() {

    const [activeStep, setActiveStep] = useState(0);
    const steps = [
        "Address",
        "Payment",
        "Order Summary",
        "Payment",
    ];

  return (
    <div>
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step,index) => (
                <Step key={index}>
                    <StepLabel>{step}</StepLabel>
                </Step>
            ))}
        </Stepper>
        <div>
            {activeStep === 0 && <AddressInfo />}
        </div>

    </div>
  )
}

export default Checkout