import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./ProductReducers";
import { errorReducer } from "./errorReducer";
import { cartReducer } from "./cartReducer";
import { authReducer } from "./authReducer";
import { paymentMethodReducer } from "./paymentMethodReducer";
import { adminReducer } from "./adminReducer";
import { orderReducer } from "./orderReducer";
import { sellerReducer } from "./sellerReducer";



const user = localStorage.getItem('auth')
   ? JSON.parse(localStorage.getItem('auth')) : null;

//const cartItems = localStorage.getItem('cartItems')
  // ? JSON.parse(localStorage.getItem('cartItems')) : [];

const rawCart = localStorage.getItem('cartItems');
let cartItems = [];
try {
  cartItems = rawCart ? JSON.parse(rawCart) : [];
} catch {
  cartItems = [];
}

cartItems = Array.isArray(cartItems)
  ? cartItems.map(item => ({
      ...item,
      stock: typeof item.stock === 'number'
        ? item.stock
        : Number(item.stock ?? item.quantity ?? 0),
    }))
  : [];

const selectedUserCheckoutAddress = localStorage.getItem('CHECKOUT_ADDRESS')
   ? JSON.parse(localStorage.getItem('CHECKOUT_ADDRESS')) : null;

const clientSecretLS = localStorage.getItem('client-secret')
    ? JSON.parse(localStorage.getItem('client-secret'))
    : null;

const initialState = {
  auth: {user : user, selectedUserCheckoutAddress, clientSecret: clientSecretLS},
  carts : {cart : cartItems},

};

export const store = configureStore({
  reducer: {
    products: productReducer,
    errors: errorReducer,
    carts: cartReducer,
    auth: authReducer,
    payment: paymentMethodReducer,
    admin: adminReducer,
    order: orderReducer,
    seller: sellerReducer,
  }, 
  preloadedState: initialState,
  
});

export default store;