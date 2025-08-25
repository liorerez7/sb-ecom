import { Elements } from '@stripe/react-stripe-js'
import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';
import PaymentForm from './PaymentForm';
import { createStripePaymentSecret } from '../../store/actions';
import { Skeleton } from '../shared/Skeleton';

function StripePayment() {

  const dispatch = useDispatch();
  const {clientSecret} = useSelector((state) => state.auth);
  const {totalPrice} = useSelector((state) => state.carts);
  const {isLoading, errorMessage} = useSelector((state) => state.errors);
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  useEffect(() => {
    if (!clientSecret) {
      dispatch(createStripePaymentSecret(totalPrice));
    }
  }, [clientSecret]);

  if(isLoading){
    return (
      <div>
        <Skeleton />
      </div>
    )
  }

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise}  options={{clientSecret}}>
          <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
        </Elements>
      )}
    </>
  )
}

export default StripePayment