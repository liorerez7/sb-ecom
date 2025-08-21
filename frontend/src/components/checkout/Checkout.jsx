import { StepLabel } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Step, Stepper } from '@mui/material';
import { AddressInfo } from './AddressInfo';
import { useDispatch } from 'react-redux';
import { getUserAddresses } from '../../store/actions';

function Checkout() {

    const [activeStep, setActiveStep] = useState(0);
    const dispatch = useDispatch();

    const steps = [
        "Address",
        "Payment",
        "Order Summary",
        "Payment",
    ];


    useEffect(() => {
        dispatch(getUserAddresses());
    }, [dispatch]);

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