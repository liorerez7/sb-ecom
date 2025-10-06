import { useRef, useEffect, useState } from 'react';
import {
  CheckCircleIcon,
  TruckIcon,
  ShoppingBagIcon,
  HomeIcon,
  ExclamationTriangleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { stripePaymentConfirmation } from '../../store/actions';
import toast from 'react-hot-toast';

const PaymentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.carts);
  const { user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const paymentIntent = searchParams.get("payment_intent");
  const clientSecret = searchParams.get("payment_intent_client_secret");
  const redirectedStatus = searchParams.get("redirect_status");

  const selectedUserCheckoutAddress = JSON.parse(localStorage.getItem('CHECKOUT_ADDRESS') || 'null');
  const onceRef = useRef(false);

  useEffect(() => {
    const ok =
      redirectedStatus === 'succeeded' &&
      paymentIntent && clientSecret &&
      Array.isArray(cart) && cart.length > 0;

    if (!ok || onceRef.current) return;

    onceRef.current = true;

    try {
      localStorage.removeItem('stripe_idem');
    } catch (_) {}

    if (paymentIntent && clientSecret && redirectedStatus && cart && cart?.length > 0) {
      const sendData = {
        addressId: Number(selectedUserCheckoutAddress?.addressId),
        pgName: "Stripe",
        pgPaymentId: paymentIntent,
        pgStatus: "succeeded",
        pgResponseMessage: "Payment successful"
      };

      dispatch(stripePaymentConfirmation(sendData, setErrorMessage, setLoading, toast));
    }
  }, [paymentIntent, clientSecret, redirectedStatus, cart, dispatch, selectedUserCheckoutAddress]);

  // Loading component with beautiful animations
  const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-8 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-6 bg-gray-200 rounded-lg mx-auto w-3/4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded-lg mx-auto w-1/2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl border-0 p-8 text-center transform transition-all duration-300">
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ExclamationTriangleIcon className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Payment Failed</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Something went wrong with your payment. Don't worry, your card wasn't charged.
          </p>
          
          {errorMessage && (
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-red-700">{errorMessage}</p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="w-full bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transform hover:scale-105 transition-all duration-200"
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Success state component
  const SuccessState = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Animation Card */}
        <div className="bg-white rounded-3xl shadow-2xl border-0 p-8 md:p-12 text-center mb-8 transform transition-all duration-500">
          {/* Animated Success Icon */}
          <div className="relative mb-8">
            <div className="w-28 h-28 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
              <CheckCircleIcon className="w-16 h-16 text-white" />
            </div>
            
            {/* Decorative sparkles */}
            <SparklesIcon className="w-6 h-6 text-yellow-400 absolute top-2 right-1/3 animate-pulse" />
            <SparklesIcon className="w-4 h-4 text-yellow-400 absolute bottom-2 left-1/3 animate-pulse delay-300" />
            <SparklesIcon className="w-5 h-5 text-yellow-400 absolute top-1/2 left-2 animate-pulse delay-700" />
          </div>
          
          {/* Success Message */}
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Order Confirmed!
          </h1>
          
          <p className="text-xl text-gray-700 mb-6 leading-relaxed">
            🎉 Thank you for your purchase{user?.username ? `, ${user.username}` : ''}!
          </p>
          
          {/* Status Badge */}
          <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-6 py-3 rounded-full text-lg font-semibold shadow-md mb-8">
            <TruckIcon className="w-6 h-6 mr-3" />
            Your order is being processed
          </div>
          
          {/* Description */}
          <p className="text-gray-600 leading-relaxed max-w-lg mx-auto mb-8">
            We've received your order and payment successfully. You'll receive a confirmation email shortly with your order details and tracking information.
          </p>

          {/* Order ID Display */}
          {paymentIntent && (
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Order ID</h3>
              <p className="text-lg font-mono text-gray-800 break-all">{paymentIntent}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => navigate('/products')}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center"
          >
            <ShoppingBagIcon className="w-6 h-6 mr-3" />
            Continue Shopping
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full bg-white text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-md border border-gray-200 flex items-center justify-center"
          >
            <HomeIcon className="w-6 h-6 mr-3" />
            Back to Home
          </button>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-8 text-gray-500">
          <p className="text-sm">
            Need help? Contact our support team anytime.
          </p>
        </div>
      </div>
    </div>
  );

  // Main render logic
  if (loading) {
    return <LoadingSkeleton />;
  }

  if (errorMessage || redirectedStatus !== 'succeeded') {
    return <ErrorState />;
  }

  return <SuccessState />;
};

export default PaymentConfirmation;