import { StepLabel, Step, Stepper, Button, Container, Box, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AddressInfo } from './AddressInfo';
import { useDispatch } from 'react-redux';
import { getUserAddresses } from '../../store/actions';
import { useSelector } from 'react-redux';
import { Skeleton } from '../shared/Skeleton';
import ErrorPage from '../shared/ErrorPage';
import PaymentMethod from '../PaymentMethod';
import OrderSummary from './OrderSummary';
import StripePayment from './StripePayment';
import Paypal from './Paypal';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';

function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const { address, selectedUserCheckoutAddress } = useSelector((state) => state.auth);
  const { cart, totalPrice } = useSelector((state) => state.carts);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { paymentMethod } = useSelector((state) => state.payment);

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const steps = [
    'Address',
    'Payment',
    'Order Summary',
    'Payment',
  ];

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  return (
    <Box dir="auto">
      <Container maxWidth="md" sx={{ pt: { xs: 2, sm: 3 }, pb: { xs: 14, sm: 16 } }}>
        <Paper elevation={1} sx={{ p: { xs: 1, sm: 2 }, mb: { xs: 2, sm: 3 } }} aria-label="Checkout progress">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        {isLoading ? (
          <Box aria-busy="true" aria-live="polite">
            <Skeleton />
          </Box>
        ) : (
          <Box>
            {activeStep === 0 && <AddressInfo address={address} />}
            {activeStep === 1 && <PaymentMethod />}
            {activeStep === 2 && (
              <OrderSummary
                totalPrice={totalPrice}
                cart={cart}
                address={selectedUserCheckoutAddress}
                paymentMethod={paymentMethod}
              />
            )}
            {activeStep === 3 && (paymentMethod === 'Stripe' ? <StripePayment /> : <Paypal />)}
          </Box>
        )}

        {errorMessage && (
          <Box sx={{ mt: 2 }} aria-live="assertive">
            <ErrorPage message={errorMessage} />
          </Box>
        )}
      </Container>

      <Paper
        elevation={3}
        role="toolbar"
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.appBar,
          px: { xs: 2, sm: 3 },
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid',
          borderColor: 'divider',
          // iOS safe area support
          paddingBottom: 'calc(env(safe-area-inset-bottom) + 16px)',
          backgroundColor: 'background.paper',
        }}
      >
        <Button
          variant="outlined"
          disabled={activeStep === 0}
          onClick={handleBack}
          aria-label="Go to previous step"
          startIcon={<MdArrowBack aria-hidden="true" />}
        >
          Back
        </Button>

        <Button
          variant="contained"
          disabled={
            errorMessage || (activeStep === 0 ? !selectedUserCheckoutAddress : activeStep === 1 ? !paymentMethod : false || activeStep === steps.length - 1)
          }
          onClick={handleNext}
          aria-label="Go to next step"
          endIcon={<MdArrowForward aria-hidden="true" />}
        >
          Next
        </Button>
      </Paper>
    </Box>
  );
}

export default Checkout;
