// import React, { useRef, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import PaymentForm from './PaymentForm';
// import { createStripePaymentSecret } from '../../store/actions';
// import { Skeleton } from '../shared/Skeleton';

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// function StripePayment() {
//   const dispatch = useDispatch();
//   const { clientSecret } = useSelector((state) => state.auth);
//   const { totalPrice } = useSelector((state) => state.carts);
//   const { isLoading } = useSelector((state) => state.errors);
//   const { user, selectedUserCheckoutAddress } = useSelector((state) => state.auth);

//   const initRef = useRef(false);

//   useEffect(() => {
//     if (initRef.current) return;
//     if (!clientSecret) {
//       initRef.current = true;

//       const sendData = {
//         amount: Number(totalPrice) * 100,
//         currency: 'USD',
//         email: user.email,
//         name: String(user.username || ''),
//         address: selectedUserCheckoutAddress,
//         description: 'Order for ' + user.email,
//         metadata: {
//           test: '1',
//         },
//       };

//       dispatch(createStripePaymentSecret(sendData));
//     }
//   }, [clientSecret, dispatch, totalPrice, user, selectedUserCheckoutAddress]);

//   if (isLoading) {
//     return <Skeleton />;
//   }

//   return (
//     <>
//       {clientSecret && (
//         <Elements
//           stripe={stripePromise}
//           options={{
//             clientSecret,
//             appearance: { theme: 'stripe' },
//             loader: 'never',
//           }}
//         >
//           <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
//         </Elements>
//       )}
//     </>
//   );
// }

// export default StripePayment;
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import { createStripePaymentSecret } from '../../store/actions';
import { Skeleton } from '../shared/Skeleton';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function StripePayment() {
  const dispatch = useDispatch();
  const { clientSecret } = useSelector((state) => state.auth);
  const { totalPrice, cartItems } = useSelector((state) => state.carts);
  const { isLoading } = useSelector((state) => state.errors);
  const { user, selectedUserCheckoutAddress } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!clientSecret && totalPrice && totalPrice > 0) {
      const sendData = {
        amount: Math.round(Number(totalPrice) * 100), // Convert to cents
        currency: 'USD',
        email: user.email,
        name: String(user.username || ''),
        address: selectedUserCheckoutAddress,
        description: `Order for ${user.email}`,
        metadata: {
          test: '1',
          cartItemsCount: String(cartItems?.length || 0),
        }
      };

      console.log("📤 Creating payment intent for:", sendData);
      dispatch(createStripePaymentSecret(sendData));
    }
  }, [clientSecret, totalPrice, user, selectedUserCheckoutAddress, cartItems, dispatch]);

  // Show error if no valid price or cart is empty
  if (!totalPrice || totalPrice <= 0) {
    return (
      <div className="max-w-lg mx-auto p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h2 className="text-lg font-semibold text-yellow-800 mb-2">Cannot Process Payment</h2>
        <p className="text-yellow-700">Cart is empty or there's an issue with price calculation.</p>
        <div className="mt-2 text-sm text-gray-600">
          <p>Current price: ${totalPrice || 0}</p>
          <p>Items in cart: {cartItems?.length || 0}</p>
        </div>
        <button 
          onClick={() => window.location.href = '/cart'}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Return to Cart
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-lg mx-auto">
        <Skeleton />
      </div>
    );
  }

  return (
    <>
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: { theme: 'stripe' }
          }}
        >
          <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
        </Elements>
      )}
    </>
  );
}

export default StripePayment;