import React, { useState } from 'react'
import { Skeleton } from '../shared/Skeleton';
import { PaymentElement } from '@stripe/react-stripe-js';
import { useStripe, useElements } from '@stripe/react-stripe-js';


const PaymentForm = ({clientSecret, totalPrice}) => {

    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState("");
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements || processing) {
            return;
        }

        setProcessing(true);
        const {error: submitError} = await elements.submit();

        if (!submitError){
            const {error} = await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                    return_url: import.meta.env.VITE_FRONTEND_URL + '/order-confirm',
                },
            });

            if (error) {
                setErrorMessage(error.message);
                return false;
            }
        }
    };

    const paymentElementOptions = {
        layout: "tabs",
    }

    const isLoading = !clientSecret || !stripe || !elements;

  return (
    <form onSubmit={handleSubmit} className='max-w-lg mx-auto p-4'>
        <h2>Payment Information</h2>
        {isLoading ? (
            <Skeleton />
        ) : (clientSecret && <PaymentElement options={paymentElementOptions} />)}
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}

        <button
            type="submit"
            disabled={isLoading || !clientSecret || processing}
        >
            {processing ? "processing..." : `Pay $${Number(totalPrice).toFixed(2)}`}
        </button>
    </form>
  )
}

export default PaymentForm