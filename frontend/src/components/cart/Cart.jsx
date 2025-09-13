import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdShoppingCart, MdArrowBack, MdSecurity } from "react-icons/md";
import { HiShieldCheck, HiTruck, HiRefresh, HiExclamationCircle } from "react-icons/hi";
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

  const shippingThreshold = 50;
  const remainingForFreeShipping = Math.max(0, shippingThreshold - totalPrice);
  const qualifiesForFreeShipping = totalPrice >= shippingThreshold;

  const [promoInput, setPromoInput] = useState("");
  const [promoFeedback, setPromoFeedback] = useState({ visible: false, text: "", type: "error" }); // type kept for future styling variations

  if (!cart || cart.length === 0) {
    return <CartEmpty />;
  }

  const handlePromoCode = () => {
 
    setPromoFeedback({
      visible: true,
      text: "Wrong code. Please check and try again.",
      type: "error",
    });

    window.clearTimeout(handlePromoCode._timer);
    handlePromoCode._timer = window.setTimeout(() => {
      setPromoFeedback((prev) => ({ ...prev, visible: false }));
    }, 2500);
  };

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
                      <span className={`text-sm ${qualifiesForFreeShipping ? "text-emerald-600 font-semibold" : "text-slate-500"}`}>
                        {qualifiesForFreeShipping ? "FREE" : "Calculated at checkout"}
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

                <div className="flex gap-2 flex-col sm:flex-row">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    aria-label="Promo code"
                    aria-invalid={promoFeedback.visible ? "true" : "false"}
                    className={`flex-1 rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2
                      ${promoFeedback.visible ? "border-red-300 focus:ring-red-400/30" : "border-amber-200 focus:border-amber-400 focus:ring-amber-400/20"}`}
                  />
                  <button
                    onClick={handlePromoCode}
                    type="button"
                    className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {/* Inline feedback (no alerts) */}
                {promoFeedback.visible && (
                  <div
                    className="mt-3 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 transition-opacity"
                    role="status"
                    aria-live="polite"
                  >
                    <HiExclamationCircle className="text-red-500" />
                    <span>{promoFeedback.text}</span>
                  </div>
                )}
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
