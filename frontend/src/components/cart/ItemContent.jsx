import React, { useState } from "react";
import SetQuantity from "./SetQuantity";
import { useDispatch } from "react-redux";
import {
  increaseCartQuantity,
  decreaseCartQuantity,
  removeFromCart,
} from "../../store/actions";
import { toast } from "react-hot-toast";
import { HiOutlineTrash } from "react-icons/hi";

const ItemContent = ({
  productId,
  productName,
  image,
  description,
  quantity,
  price,
  discount,
  specialPrice,
  cartId,
  isLast = false
}) => {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const dispatch = useDispatch();
  //image = "5db0e8f4-8cec-4b3e-aa3e-bd78d2133d35";

  const getImageUrl = (imageName) => {
    if (!imageName) return '/placeholder-image.jpg'; 
    
    // אם זה URL מלא, השתמש בו
    if (imageName.startsWith('http')) {
      return imageName;
    }
    
    // אחרת, בנה URL עם הבסיס שלך
    return `${import.meta.env.VITE_BACK_END_URL}/images/${imageName}`;
  };

  const handleQtyIncrease = (cartItems) => {
    dispatch(
      increaseCartQuantity(cartItems, toast, currentQuantity, setCurrentQuantity)
    );
  };

  const handleQtyDecrease = (cartItems) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      setCurrentQuantity(newQuantity);
      dispatch(decreaseCartQuantity(cartItems, newQuantity));
    }
  };

  const removeItemFromCart = (cartItems) => {
    dispatch(removeFromCart(cartItems, toast));
  };

  const unit = Number(specialPrice);
  const originalPrice = Number(price);
  const lineTotal = (Number(currentQuantity) * unit).toFixed(2);
  

  return (
    <div className={`group relative ${isLast ? '' : 'border-b border-slate-100'}`}>
      <div className="grid grid-cols-12 items-center gap-4 p-6 transition-all hover:bg-slate-50/50">
        {/* Product Info (6 columns) */}
        <div className="col-span-12 md:col-span-6">
          <div className="flex items-start gap-4">
            {/* Product Image */}
            <div className="flex-shrink-0">
              <div className="h-24 w-24 overflow-hidden rounded-xl border-2 border-slate-100 bg-white shadow-sm">
                <img
                  src={getImageUrl(image)}
                  alt={productName}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg'; // fallback
                  }}
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold text-slate-900 leading-tight">
                {truncateText(productName, 60)}
              </h3>
              
              {description && (
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                  {truncateText(description, 100)}
                </p>
              )}

              {/* Price Info for Mobile */}
              <div className="mt-2 md:hidden">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-slate-900">
                    {formatPrice(unit)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() =>
                    removeItemFromCart({
                      image,
                      productName,
                      description,
                      specialPrice,
                      price,
                      productId,
                      quantity,
                    })
                  }
                  className="group/trash inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-all"
                >
                  <HiOutlineTrash className="group-hover/trash:text-red-500" size={14} />
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Price (2 columns) */}
        <div className="col-span-2 hidden text-center md:block">
          <div className="text-lg font-bold text-slate-900">
            {formatPrice(unit)}
          </div>
        </div>

        {/* Quantity (2 columns) */}
        <div className="col-span-6 md:col-span-2">
          <div className="flex justify-center md:justify-center">
            <SetQuantity
              quantity={currentQuantity}
              cardCounter={true}
              handeQtyIncrease={() =>
                handleQtyIncrease({
                  image,
                  productName,
                  description,
                  specialPrice,
                  price,
                  productId,
                  quantity,
                })
              }
              handleQtyDecrease={() =>
                handleQtyDecrease({
                  image,
                  productName,
                  description,
                  specialPrice,
                  price,
                  productId,
                  quantity,
                })
              }
            />
          </div>
        </div>

        {/* Total (2 columns) */}
        <div className="col-span-6 md:col-span-2">
          <div className="text-right">
            <div className="text-lg font-bold text-slate-900">
              {formatPrice(Number(lineTotal))}
            </div>
            <div className="text-xs text-slate-500">
              {currentQuantity} × {formatPrice(unit)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemContent;

function formatPrice(value) {
  if (isNaN(value)) return "$0.00";
  return `$${Number(value).toFixed(2)}`;
}

function truncateText(text, maxLength = 40) {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}
