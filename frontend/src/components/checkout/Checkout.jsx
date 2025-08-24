import { StepLabel } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Step, Stepper } from '@mui/material';
import { AddressInfo } from './AddressInfo';
import { useDispatch } from 'react-redux';
import { getUserAddresses } from '../../store/actions';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { Skeleton } from '../shared/Skeleton';
import ErrorPage from '../shared/ErrorPage';
import PaymentMethod from '../PaymentMethod';
import OrderSummary from './OrderSummary';
import StripePayment from './StripePayment';
import Paypal from './Paypal';

function Checkout() {

    const [activeStep, setActiveStep] = useState(0);
    const dispatch = useDispatch();
    const {address, selectedUserCheckoutAddress} = useSelector((state) => state.auth);
    const {cart, totalPrice} = useSelector((state) => state.carts);
    const {isLoading, errorMessage} = useSelector((state) => state.errors);

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const handleNext = () => {
        setActiveStep((prev) => prev + 1);
    };

    const {paymentMethod} = useSelector((state) => state.payment);

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

        {isLoading ? (
            <div>
                <Skeleton />
            </div>
        ) : (
            <div>
            {activeStep === 0 && <AddressInfo address={address}/>}
            {activeStep === 1 && <PaymentMethod />}
            {activeStep === 2 && <OrderSummary totalPrice={totalPrice}
                                                cart={cart}
                                                address={selectedUserCheckoutAddress}
                                                paymentMethod={paymentMethod}
                                                />}
            {activeStep === 3 && (paymentMethod === 'Stripe' ? <StripePayment /> : <Paypal />)}

            </div>
        )}

        

        <div
            className='flex justify-between items-center px-4 fixed z-50 h-24 bottom-0 bg-white'>
            <Button 
                variant='outlined'
                disabled={activeStep === 0}
                onClick={handleBack}
            >
                Back
            </Button>
            <Button 
                variant='contained'
                disabled={
                    errorMessage || (activeStep === 0 ? !selectedUserCheckoutAddress :
                         activeStep === 1 ? !paymentMethod : false) 
                }
                onClick={handleNext}
            >
                Next
            </Button>
        </div>
        {errorMessage && <ErrorPage message={errorMessage}/>}

    </div>
  )
}



export default Checkout