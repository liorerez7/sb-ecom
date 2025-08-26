import React, {useRef} from 'react'
import { Skeleton } from '../shared/Skeleton';
import { FaCheckCircle } from 'react-icons/fa';
import { stripePaymentConfirmation } from '../../store/actions';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';



const PaymentConfirmation = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const dispatch = useDispatch();
    const {cart} = useSelector((state) => state.carts);

    const [loading, setLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState(null);

    const paymentIntent = searchParams.get("payment_intent");
    const clientSecret = searchParams.get("payment_intent_client_secret");
    const redirectedStatus = searchParams.get("redirect_status");

    const selectedUserCheckoutAddress = JSON.parse(localStorage.getItem('CHECKOUT_ADDRESS'));


    const onceRef = useRef(false);



    useEffect(() => {

        const ok =
            redirectedStatus === 'succeeded' &&
            paymentIntent && clientSecret &&
            Array.isArray(cart) && cart.length > 0;

        if (!ok || onceRef.current) return;

        onceRef.current = true;

        if (paymentIntent && clientSecret && redirectedStatus && cart && cart?.length > 0) {
            
            const sendData = {
                addressId: Number(selectedUserCheckoutAddress?.addressId),
                pgName: "Stripe",
                pgPaymentId: paymentIntent,
                pgStatus: "succeeded",
                pgResponseMessage: "Payment successful"
            };

            console.log("Sending payment confirmation data:", sendData);


            dispatch(stripePaymentConfirmation(sendData, setErrorMessage, setLoading, toast))

        } else {
            // Handle payment confirmation error
        }
    }, [paymentIntent, clientSecret, redirectedStatus, cart, dispatch])

  return (
    <div>
        {loading ? (
            <Skeleton />
        ) : (
            <h1>
                <FaCheckCircle />
                Payment Confirmation
            </h1>
        )}
    </div>
  )
}

export default PaymentConfirmation