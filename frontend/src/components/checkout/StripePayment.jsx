import { Elements } from '@stripe/react-stripe-js'
import React, {useRef} from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';
import PaymentForm from './PaymentForm';
import { createStripePaymentSecret } from '../../store/actions';
import { Skeleton } from '../shared/Skeleton';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


function StripePayment() {

  const dispatch = useDispatch();
  const {clientSecret} = useSelector((state) => state.auth);
  const {totalPrice} = useSelector((state) => state.carts);
  const {isLoading, errorMessage} = useSelector((state) => state.errors);
  const {user, selectedUserCheckoutAddress} = useSelector((state) => state.auth);

  const initRef = useRef(false);

  useEffect(() => {

      if(initRef.current) return;

    if (!clientSecret) {

        initRef.current = true;
        const sendData = {
            amount: Number(totalPrice) * 100,
            currency: "USD",
            email: user.email,
            name: user.username + "",
            address: selectedUserCheckoutAddress,
            description: "Order for " + user.email,
            metadata: {
                test: 1,
            }
        }
      dispatch(createStripePaymentSecret(sendData));
    }
  }, [clientSecret, dispatch]);

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
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: { theme: 'stripe' },
            loader: 'never'
          }}
        >
          <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
        </Elements>
      )}
    </>
  )
}

export default StripePayment