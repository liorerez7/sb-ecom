// import React, { useState } from 'react';
// import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { Skeleton } from '../shared/Skeleton';

// const PaymentForm = ({ clientSecret, totalPrice }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [errorMessage, setErrorMessage] = useState('');
//   const [processing, setProcessing] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements || processing) return;

//     setProcessing(true);

//     const { error: submitError } = await elements.submit();
//     if (submitError) {
//       setErrorMessage(submitError.message || 'Validation error');
//       setProcessing(false);
//       return;
//     }

//     const { error, paymentIntent } = await stripe.confirmPayment({
//       elements,
//       clientSecret,
//       confirmParams: {
//         return_url: `${window.location.origin}/order-confirm`,
//       },
//       redirect: 'if_required',
//     });

//     if (error) {
//       setErrorMessage(error.message || 'Payment failed');
//       setProcessing(false);
//       return;
//     }

//     if (paymentIntent && (paymentIntent.status === 'succeeded' || paymentIntent.status === 'processing')) {
//       window.location.assign(`${window.location.origin}/order-confirm`);
//       return;
//     }

//     setProcessing(false);
//   };

//   const paymentElementOptions = { layout: 'tabs' };
//   const isLoading = !clientSecret || !stripe || !elements;

//   return (
//     <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
//       <h2 className="text-lg font-semibold mb-3">Payment Information</h2>

//       {isLoading ? (
//         <Skeleton />
//       ) : (
//         <PaymentElement options={paymentElementOptions} />
//       )}

//       {errorMessage && (
//         <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
//       )}

//       <button
//         type="submit"
//         disabled={isLoading || !clientSecret || processing}
//         className="mt-4 px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-60"
//       >
//         {processing ? 'Processing...' : `Pay $${Number(totalPrice).toFixed(2)}`}
//       </button>
//     </form>
//   );
// };

// export default PaymentForm;

// import React, { useState } from 'react';
// import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { Skeleton } from '../shared/Skeleton';

// const PaymentForm = ({ clientSecret, totalPrice }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [errorMessage, setErrorMessage] = useState('');
//   const [processing, setProcessing] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!stripe || !elements || processing) {
//       console.log("⚠️ Stripe not ready or already processing");
//       return;
//     }

//     setProcessing(true);
//     setErrorMessage(''); // נקה שגיאות קודמות

//     console.log("🔄 Starting payment process...");

//     try {
//       // בדיקת תקינות של elements
//       const { error: submitError } = await elements.submit();
//       if (submitError) {
//         console.error("❌ Elements submit error:", submitError);
//         setErrorMessage(submitError.message || 'Validation error');
//         setProcessing(false);
//         return;
//       }

//       console.log("✅ Elements validated successfully");

//       // אישור תשלום
//       const { error, paymentIntent } = await stripe.confirmPayment({
//         elements,
//         clientSecret,
//         confirmParams: {
//           return_url: `${window.location.origin}/order-confirm`,
//         },
//         redirect: 'if_required',
//       });

//       console.log("🔍 Payment result:", { error, paymentIntent });

//       if (error) {
//         console.error("❌ Payment confirmation error:", error);
//         setErrorMessage(error.message || 'Payment failed');
//         setProcessing(false);
//         return;
//       }

//       if (paymentIntent) {
//         console.log("💰 Payment status:", paymentIntent.status);
        
//         if (paymentIntent.status === 'succeeded') {
//           console.log("✅ Payment succeeded!");
//           window.location.assign(`${window.location.origin}/order-confirm`);
//           return;
//         }
        
//         if (paymentIntent.status === 'processing') {
//           console.log("⏳ Payment is processing...");
//           window.location.assign(`${window.location.origin}/order-confirm`);
//           return;
//         }
        
//         if (paymentIntent.status === 'requires_action') {
//           console.log("🔐 Payment requires additional authentication");
//           setErrorMessage('Payment requires additional authentication');
//         }
//       }

//     } catch (err) {
//       console.error("❌ Unexpected error during payment:", err);
//       setErrorMessage('An unexpected error occurred');
//     }

//     setProcessing(false);
//   };

//   const paymentElementOptions = { 
//     layout: 'tabs',
//     business: { name: 'Your Store Name' } // הוסף שם העסק
//   };
  
//   const isLoading = !clientSecret || !stripe || !elements;

//   return (
//     <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
//       <h2 className="text-lg font-semibold mb-3">Payment Information</h2>

//       {isLoading ? (
//         <Skeleton />
//       ) : (
//         <PaymentElement options={paymentElementOptions} />
//       )}

//       {errorMessage && (
//         <div className="text-red-500 text-sm mt-2 p-2 bg-red-50 border border-red-200 rounded">
//           ❌ {errorMessage}
//         </div>
//       )}

//       <button
//         type="submit"
//         disabled={isLoading || !clientSecret || processing}
//         className={`mt-4 px-4 py-2 rounded text-white transition-colors ${
//           isLoading || !clientSecret || processing 
//             ? 'bg-gray-400 cursor-not-allowed' 
//             : 'bg-blue-600 hover:bg-blue-700'
//         }`}
//       >
//         {processing ? (
//           <span className="flex items-center">
//             <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//             Processing...
//           </span>
//         ) : (
//           `Pay $${Number(totalPrice).toFixed(2)}`
//         )}
//       </button>
//     </form>
//   );
// };

// export default PaymentForm;
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