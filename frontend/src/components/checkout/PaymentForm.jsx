//
// import React, { useState } from 'react';
// import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { Skeleton } from '../shared/Skeleton';
//
// const PaymentForm = ({ clientSecret, totalPrice }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [errorMessage, setErrorMessage] = useState('');
//   const [processing, setProcessing] = useState(false);
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//
//     if (!stripe || !elements) {
//       return;
//     }
//
//     setProcessing(true);
//     setErrorMessage('');
//
//     console.log("Starting payment process...");
//
//     try {
//       // Validate elements
//       const { error: submitError } = await elements.submit();
//       if (submitError) {
//         console.error("Elements submit error:", submitError);
//         setErrorMessage(submitError.message);
//         setProcessing(false);
//         return;
//       }
//
//       console.log("Elements validated successfully");
//
//       // Confirm payment with redirect
//       const { error } = await stripe.confirmPayment({
//         elements,
//         clientSecret,
//         confirmParams: {
//           return_url: `${window.location.origin}/order-confirm`,
//         },
//       });
//
//       if (error) {
//         console.error("Payment confirmation error:", error);
//         setErrorMessage(error.message);
//         setProcessing(false);
//         return;
//       }
//
//       // If we reach here without error, Stripe will handle the redirect
//       console.log("Payment confirmation initiated, Stripe will handle redirect");
//
//     } catch (err) {
//       console.error("Unexpected error during payment:", err);
//       setErrorMessage('An unexpected error occurred. Please try again.');
//       setProcessing(false);
//     }
//   };
//
//   const paymentElementOptions = {
//     layout: 'tabs'
//   };
//
//   const isLoading = !clientSecret || !stripe || !elements;
//
//   return (
//     <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
//       <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
//
//       {isLoading ? (
//         <Skeleton />
//       ) : (
//         <>
//           {clientSecret && <PaymentElement options={paymentElementOptions} />}
//
//           {errorMessage && (
//             <div className="text-red-500 text-sm mt-2 p-2 bg-red-50 border border-red-200 rounded">
//               {errorMessage}
//             </div>
//           )}
//
//           <button
//             type="submit"
//             disabled={!stripe || isLoading || processing}
//             className={`text-white w-full px-5 py-3 mt-4 rounded-md font-bold transition-colors ${
//               !stripe || isLoading || processing
//                 ? 'bg-gray-400 cursor-not-allowed opacity-50'
//                 : 'bg-black hover:bg-gray-800'
//             }`}
//           >
//             {processing ? (
//               <span className="flex items-center justify-center">
//                 <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Processing...
//               </span>
//             ) : (
//               !isLoading ? `Pay $${Number(totalPrice).toFixed(2)}` : "Processing"
//             )}
//           </button>
//         </>
//       )}
//     </form>
//   );
// };
//
// export default PaymentForm;








import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Skeleton } from '../shared/Skeleton';

const PaymentForm = ({ clientSecret, totalPrice }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState('');
    const [processing, setProcessing] = useState(false);
    const [showDemoCard, setShowDemoCard] = useState(true);
    const [copiedField, setCopiedField] = useState(null);

    const demoCardData = {
        number: '4242 4242 4242 4242',
        expiry: '05/30',
        cvc: '123',
        zip: '12345'
    };

    const copyToClipboard = async (text, field) => {
        try {
            // Modern clipboard API
            await navigator.clipboard.writeText(text);
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), 2000);
        } catch (err) {
            console.error('Clipboard API failed, trying fallback:', err);
            // Fallback method for older browsers or non-HTTPS contexts
            try {
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.top = '0';
                textArea.style.left = '0';
                textArea.style.opacity = '0';
                textArea.style.pointerEvents = 'none';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();

                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);

                if (successful) {
                    setCopiedField(field);
                    setTimeout(() => setCopiedField(null), 2000);
                } else {
                    console.error('Fallback copy failed');
                    alert('Failed to copy. Please copy manually: ' + text);
                }
            } catch (err2) {
                console.error('All copy methods failed:', err2);
                alert('Failed to copy. Please copy manually: ' + text);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);
        setErrorMessage('');

        try {
            const { error: submitError } = await elements.submit();
            if (submitError) {
                console.error("Elements submit error:", submitError);
                setErrorMessage(submitError.message);
                setProcessing(false);
                return;
            }

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
        <>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
                <h2 className="text-xl font-semibold mb-4">Payment Information</h2>

                {isLoading ? (
                    <Skeleton />
                ) : (
                    <>
                        {clientSecret && (
                            <div className="mb-4">
                                <PaymentElement options={paymentElementOptions} />
                            </div>
                        )}

                        {errorMessage && (
                            <div className="text-red-500 text-sm mt-2 p-2 bg-red-50 border border-red-200 rounded">
                                {errorMessage}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={!stripe || isLoading || processing}
                            className={`text-white w-full min-h-[44px] touch-manipulation px-5 py-3 mt-4 rounded-md font-bold transition-colors ${
                                !stripe || isLoading || processing
                                    ? 'bg-gray-400 cursor-not-allowed opacity-50'
                                    : 'bg-black hover:bg-gray-800 active:bg-gray-900'
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

            {/* Demo Card Floating Widget */}
            {showDemoCard && !isLoading && (
                <div className="fixed bottom-32 sm:bottom-24 md:bottom-20 right-6 z-50 animate-slide-in">
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-5 w-80 border-2 border-white/20">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <span className="text-2xl">💳</span>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg leading-tight">Test Card</h3>
                                    <p className="text-white/80 text-xs">For demo purposes</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setShowDemoCard(false);
                                }}
                                className="text-white/80 hover:text-white transition p-1"
                                aria-label="Close demo card"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Card Details */}
                        <div className="space-y-3">
                            {/* Card Number */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-white/70 text-xs font-medium">Card Number</span>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            copyToClipboard(demoCardData.number.replace(/\s/g, ''), 'number');
                                        }}
                                        className="cursor-pointer text-white/90 hover:text-white hover:bg-white/30 text-xs font-semibold bg-white/20 px-2 py-1 rounded transition flex items-center gap-1"
                                    >
                                        {copiedField === 'number' ? (
                                            <>
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                                Copy
                                            </>
                                        )}
                                    </button>
                                </div>
                                <div className="text-white font-mono text-base font-semibold tracking-wider">
                                    {demoCardData.number}
                                </div>
                            </div>

                            {/* Expiry and CVC */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-white/70 text-xs font-medium">Expiry</span>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                copyToClipboard(demoCardData.expiry, 'expiry');
                                            }}
                                            className="cursor-pointer text-white/90 hover:text-white hover:bg-white/30 text-xs font-semibold bg-white/20 px-2 py-1 rounded transition"
                                        >
                                            {copiedField === 'expiry' ? '✓' : 'Copy'}
                                        </button>
                                    </div>
                                    <div className="text-white font-mono text-base font-semibold">
                                        {demoCardData.expiry}
                                    </div>
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-white/70 text-xs font-medium">CVC</span>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                copyToClipboard(demoCardData.cvc, 'cvc');
                                            }}
                                            className="cursor-pointer text-white/90 hover:text-white hover:bg-white/30 text-xs font-semibold bg-white/20 px-2 py-1 rounded transition"
                                        >
                                            {copiedField === 'cvc' ? '✓' : 'Copy'}
                                        </button>
                                    </div>
                                    <div className="text-white font-mono text-base font-semibold">
                                        {demoCardData.cvc}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Note */}
                        <div className="mt-4 text-center">
                            <p className="text-white/60 text-xs">
                                Click any "Copy" button to paste into the form above
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Reopen Button (when closed) */}
            {!showDemoCard && !isLoading && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowDemoCard(true);
                    }}
                    className="fixed bottom-32 sm:bottom-24 md:bottom-20 right-6 z-50 bg-gradient-to-br from-blue-600 to-purple-600 text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2 font-semibold border-2 border-white/20 animate-bounce-subtle"
                >
                    <span className="text-xl">💳</span>
                    <span>Demo Card</span>
                </button>
            )}

            <style>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(100px) translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }
        }

        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-slide-in {
          animation: slide-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        /* Mobile adjustments */
        @media (max-width: 640px) {
          .fixed.bottom-32.right-6,
          .fixed.bottom-24.right-6,
          .fixed.bottom-20.right-6 {
            bottom: calc(8rem + env(safe-area-inset-bottom));
            right: 1rem;
            left: 1rem;
            width: auto;
          }
          .fixed.bottom-28.right-6 > div,
          .fixed.bottom-10.right-6 > div,
          .fixed.bottom-6.right-6 > div {
            width: 100%;
          }
        }
      `}</style>
        </>
    );
};

export default PaymentForm;