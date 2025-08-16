// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { MdShoppingCart, MdArrowBack } from "react-icons/md";
// import ItemContent from "./ItemContent";
// import CartEmpty from "./CartEmpty.jsx";



// const Cart = () => {
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.carts?.cart ?? []);

//   const totalPrice =
//     cart?.reduce((sum, item) => {
//       const unit = Number(item?.specialPrice ?? item?.price ?? 0);
//       const qty = Number(item?.quantity ?? 0);
//       return sum + unit * qty;
//     }, 0) ?? 0;

//   if (!cart || cart.length === 0) {
//     return <CartEmpty />;
//   }


//   return (
//     <div className="max-w-5xl mx-auto px-3 py-6">
//       <h1 className="text-xl font-semibold flex items-center gap-2 mb-4">
//         <MdShoppingCart />
//         Your Cart
//       </h1>

//       <div className="grid grid-cols-12 gap-2 py-2 border-b text-sm font-medium">
//         <div className="col-span-6">Product</div>
//         <div className="col-span-2">Price</div>
//         <div className="col-span-2">Quantity</div>
//         <div className="col-span-2">Total</div>
//       </div>

//       <div>
//         {cart.map((item) => (
//           <ItemContent
//             key={item.productId ?? item.cartId}
//             {...item}
//           />
//         ))}
//       </div>

//       <div className="flex items-center justify-between border-t pt-4 mt-4">
//         <Link to="/products" className="inline-flex items-center gap-2 text-sm underline">
//           <MdArrowBack />
//           <span>Continue Shopping</span>
//         </Link>

//         <div className="flex items-center gap-4">
//           <div className="text-sm">
//             <span className="mr-2">Subtotal:</span>
//             <span className="font-semibold">{totalPrice.toFixed(2)}</span>
//           </div>

//           <Link to="/checkout">
//             <button
//               type="button"
//               className="inline-flex items-center gap-2 px-3 py-2 border rounded"
//             >
//               <MdShoppingCart />
//               Checkout
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

// //CART.JSX
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { MdShoppingCart, MdArrowBack } from "react-icons/md";
// import ItemContent from "./ItemContent";
// import CartEmpty from "./CartEmpty.jsx";

// const Cart = () => {
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.carts?.cart ?? []);

//   const totalPrice =
//     cart?.reduce((sum, item) => {
//       const unit = Number(item?.specialPrice ?? item?.price ?? 0);
//       const qty = Number(item?.quantity ?? 0);
//       return sum + unit * qty;
//     }, 0) ?? 0;

//   if (!cart || cart.length === 0) {
//     return <CartEmpty />;
//   }

//   return (
//     <div className="mx-auto max-w-6xl px-4 py-8">
//       {/* Header */}
//       <div className="mb-6 flex items-center justify-between">
//         <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
//           <MdShoppingCart className="text-slate-700" />
//           Your Cart
//           <span className="ml-2 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
//             {cart.length} item{cart.length > 1 ? "s" : ""}
//           </span>
//         </h1>

//         <Link
//           to="/products"
//           className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900"
//         >
//           <MdArrowBack />
//           Continue shopping
//         </Link>
//       </div>

//       {/* Content */}
//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
//         {/* Items */}
//         <div className="lg:col-span-8 min-w-0">
//           {/* כותרות עמודות (תואם לחלוקה 6/2/2/2) */}
//           <div className="hidden grid-cols-12 rounded-t-md bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600 md:grid">
//             <div className="col-span-6">Product</div>
//             <div className="col-span-2 text-center">Price</div>
//             <div className="col-span-2 text-center">Quantity</div>
//             <div className="col-span-2 text-right">Total</div>
//           </div>

//           <div className="divide-y rounded-md border">
//             {cart.map((item) => (
//               <ItemContent key={item.productId ?? item.cartId} {...item} />
//             ))}
//           </div>
//         </div>

//         {/* Summary */}
//         <aside className="lg:col-span-4 lg:pl-2">
//           {/* עוגן נמוך יותר כדי שלא יהיה "גבוה מדי" וצמוד מדי */}
//           <div className="sticky top-24 space-y-4"> 
//             <div className="rounded-xl border p-5 shadow-sm">
//               <h2 className="mb-4 text-lg font-semibold text-slate-800">Order Summary</h2>

//               <div className="space-y-3 text-sm">
//                 <div className="flex items-center justify-between">
//                   <span className="text-slate-600">Subtotal</span>
//                   <span className="font-semibold text-slate-800">
//                     ${totalPrice.toFixed(2)}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-slate-600">Shipping</span>
//                   <span className="text-slate-500">Calculated at checkout</span>
//                 </div>
//                 <div className="h-px bg-slate-200" />
//                 <div className="flex items-center justify-between text-base">
//                   <span className="font-semibold text-slate-800">Total</span>
//                   <span className="font-bold text-slate-900">
//                     ${totalPrice.toFixed(2)}
//                   </span>
//                 </div>
//               </div>

//               <Link to="/checkout" className="mt-5 block">
//                 <button
//                   type="button"
//                   className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800 active:scale-[0.99]"
//                 >
//                   <MdShoppingCart size={18} />
//                   Proceed to Checkout
//                 </button>
//               </Link>

//               <p className="mt-3 text-center text-xs text-slate-500">
//                 Secure checkout • Free returns within 30 days
//               </p>
//             </div>

//             <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
//               🎁 Spend $200 for free express shipping.
//             </div>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default Cart;

//CART.JSX
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdShoppingCart, MdArrowBack, MdSecurity } from "react-icons/md";
import { HiShieldCheck, HiTruck, HiRefresh } from "react-icons/hi";
import ItemContent from "./ItemContent";
import CartEmpty from "./CartEmpty.jsx";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.carts?.cart ?? []);

  const totalPrice =
    cart?.reduce((sum, item) => {
      const unit = Number(item?.specialPrice ?? item?.price ?? 0);
      const qty = Number(item?.quantity ?? 0);
      return sum + unit * qty;
    }, 0) ?? 0;

  const shippingThreshold = 200;
  const remainingForFreeShipping = Math.max(0, shippingThreshold - totalPrice);
  const qualifiesForFreeShipping = totalPrice >= shippingThreshold;

  if (!cart || cart.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 shadow-lg">
                <MdShoppingCart className="text-xl text-white" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Shopping Cart
              </h1>
            </div>

            <Link
              to="/products"
              className="group inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300"
            >
              <MdArrowBack className="transition-transform group-hover:-translate-x-0.5" />
              Continue Shopping
            </Link>
          </div>

          {/* Progress Bar for Free Shipping */}
          {!qualifiesForFreeShipping && (
            <div className="mt-6 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-blue-900">
                  Add ${remainingForFreeShipping.toFixed(2)} more for free shipping!
                </p>
                <HiTruck className="text-blue-600" />
              </div>
              <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                  style={{ width: `${Math.min((totalPrice / shippingThreshold) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          {qualifiesForFreeShipping && (
            <div className="mt-6 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 p-4">
              <div className="flex items-center gap-2 text-emerald-800">
                <HiShieldCheck className="text-emerald-600" />
                <p className="text-sm font-medium">
                  🎉 Congratulations! You qualify for free shipping
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
          {/* Cart Items */}
          <div className="xl:col-span-8">
            <div className="rounded-xl bg-white shadow-sm border border-slate-200 overflow-hidden">
              {/* Enhanced Table Header */}
              <div className="hidden bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 md:block">
                <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-slate-700">
                  <div className="col-span-6">Product Details</div>
                  <div className="col-span-2 text-center">Unit Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Subtotal</div>
                </div>
              </div>

              {/* Items */}
              <div className="divide-y divide-slate-100">
                {cart.map((item, index) => (
                  <ItemContent key={item.productId ?? item.cartId} {...item} isLast={index === cart.length - 1} />
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Order Summary */}
          <aside className="xl:col-span-4">
            <div className="sticky top-6 space-y-6">
              {/* Main Summary Card */}
              <div className="rounded-2xl bg-white p-6 shadow-lg border border-slate-200">
                <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-900">
                  <div className="h-2 w-2 rounded-full bg-slate-900"></div>
                  Order Summary
                </h2>

                <div className="space-y-4">
                  {/* Breakdown */}
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Subtotal ({cart.length} items)</span>
                      <span className="font-semibold text-slate-900">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Shipping</span>
                      <span className={`text-sm ${qualifiesForFreeShipping ? 'text-emerald-600 font-semibold' : 'text-slate-500'}`}>
                        {qualifiesForFreeShipping ? 'FREE' : 'Calculated at checkout'}
                      </span>
                    </div>
                    
                    
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                  {/* Total */}
                  <div className="flex items-center justify-between text-lg">
                    <span className="font-bold text-slate-900">Total</span>
                    <span className="font-bold text-slate-900">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <Link to="/checkout" className="block mt-6">
                    <button
                      type="button"
                      className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:from-slate-800 hover:to-slate-700 hover:shadow-xl active:scale-[0.98]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      <div className="relative flex items-center justify-center gap-2">
                        <MdSecurity size={18} />
                        Secure Checkout
                      </div>
                    </button>
                  </Link>

                  {/* Trust Indicators */}
                  <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <HiShieldCheck className="text-emerald-500" />
                      <span>Secure payments</span>
                    </div>
                    <div className="h-3 w-px bg-slate-300"></div>
                    <div className="flex items-center gap-1">
                      <HiRefresh className="text-blue-500" />
                      <span>30-day returns</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Promo Code Card */}
              <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                  <h3 className="font-semibold text-amber-900">Have a promo code?</h3>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                  />
                  <button
                    type="button"
                    className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900 mb-3">Why shop with us?</h3>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <HiShieldCheck className="text-emerald-500" />
                    <span>100% secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiTruck className="text-blue-500" />
                    <span>Free shipping on orders $200+</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiRefresh className="text-purple-500" />
                    <span>Easy 30-day returns</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;