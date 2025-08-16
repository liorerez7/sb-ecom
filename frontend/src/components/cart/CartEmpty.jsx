// const CartEmpty = () => {

//     return (
//         <div>
//             <h2>cart empty</h2>
//         </div>
//     )
// }

// export default CartEmpty

// //CAR EMPTY
// import React from "react";
// import { Link } from "react-router-dom";
// import { MdShoppingCart } from "react-icons/md";

// const CartEmpty = () => {
//   return (
//     <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-16 text-center">
//       <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
//         <MdShoppingCart className="text-2xl text-slate-700" />
//       </div>
//       <h2 className="text-xl font-semibold text-slate-800">Your cart is empty</h2>
//       <p className="mt-2 text-sm text-slate-500">
//         Looks like you haven’t added anything yet. Explore our products and find something you love.
//       </p>
//       <Link to="/products" className="mt-6 inline-block">
//         <button
//           type="button"
//           className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 active:scale-[0.99]"
//         >
//           Browse Products
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default CartEmpty;

//CART EMPTY
import React from "react";
import { Link } from "react-router-dom";
import { MdShoppingCart, MdTrendingUp } from "react-icons/md";
import { HiSparkles } from "react-icons/hi";

const CartEmpty = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="mx-auto max-w-md text-center">
        {/* Animated Icon */}
        <div className="relative mb-8">
          <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200 shadow-lg">
            <MdShoppingCart className="text-4xl text-slate-600" />
          </div>
          <div className="absolute -right-2 -top-2 animate-bounce">
            <HiSparkles className="text-2xl text-amber-400" />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Your cart is empty
          </h1>
          <p className="text-slate-600 leading-relaxed">
            Discover amazing products and start building your perfect collection. 
            Every great shopping journey begins with the first item!
          </p>
        </div>

        {/* CTA Buttons */}
        <Link to="/products" className="block">
          <button
            type="button"
            className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-4 text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <div className="relative flex items-center justify-center gap-2 font-semibold">
              <MdTrendingUp />
              Start Shopping
            </div>
          </button>
        </Link>

        {/* Additional Info */}
        <div className="mt-12 rounded-xl bg-white/50 backdrop-blur-sm border border-white/60 p-4">
          <h3 className="font-semibold text-slate-800 mb-2">Why shop with us?</h3>
          <div className="grid grid-cols-3 gap-4 text-xs text-slate-600">
            <div className="text-center">
              <div className="font-semibold text-slate-800">Free Shipping</div>
              <div>Orders $200+</div>
            </div>
            <div className="text-center border-x border-slate-200">
              <div className="font-semibold text-slate-800">Easy Returns</div>
              <div>30 days</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-slate-800">24/7 Support</div>
              <div>Always here</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartEmpty;
