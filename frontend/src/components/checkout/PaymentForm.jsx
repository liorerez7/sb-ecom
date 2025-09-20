
import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Skeleton } from '../shared/Skeleton';

const PaymentForm = ({ clientSecret, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setErrorMessage('');

    console.log("Starting payment process...");

    try {
      // Validate elements
      const { error: submitError } = await elements.submit();
      if (submitError) {
        console.error("Elements submit error:", submitError);
        setErrorMessage(submitError.message);
        setProcessing(false);
        return;
      }

      console.log("Elements validated successfully");

      // Confirm payment with redirect
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/order-confirm`,
        },
      });

      if (error) {
        console.error("Payment confirmation error:", error);
        setErrorMessage(error.message);
        setProcessing(false);
        return;
      }

      // If we reach here without error, Stripe will handle the redirect
      console.log("Payment confirmation initiated, Stripe will handle redirect");

    } catch (err) {
      console.error("Unexpected error during payment:", err);
      setErrorMessage('An unexpected error occurred. Please try again.');
      setProcessing(false);
    }
  };

  const paymentElementOptions = {
    layout: 'tabs'
  };
  
  const isLoading = !clientSecret || !stripe || !elements;

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
      
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          {clientSecret && <PaymentElement options={paymentElementOptions} />}
          
          {errorMessage && (
            <div className="text-red-500 text-sm mt-2 p-2 bg-red-50 border border-red-200 rounded">
              {errorMessage}
            </div>
          )}
          
          <button
            type="submit"
            disabled={!stripe || isLoading || processing}
            className={`text-white w-full px-5 py-3 mt-4 rounded-md font-bold transition-colors ${
              !stripe || isLoading || processing
                ? 'bg-gray-400 cursor-not-allowed opacity-50' 
                : 'bg-black hover:bg-gray-800'
            }`}
          >
            {processing ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              !isLoading ? `Pay $${Number(totalPrice).toFixed(2)}` : "Processing"
            )}
          </button>
        </>
      )}
    </form>
  );
};

export default PaymentForm;