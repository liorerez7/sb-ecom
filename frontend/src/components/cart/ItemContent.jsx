// import React, { useState } from "react";
// import SetQuantity from "./SetQuantity";
// import { useDispatch } from "react-redux";
// import { increaseCartQuantity, decreaseCartQuantity } from "../../store/actions";
// import { toast } from "react-hot-toast";
// import { HiOutlineTrash } from "react-icons/hi";
// import { removeFromCart } from "../../store/actions";



// const ItemContent = ({
//     productId,
//     productName,
//     image,
//     description,
//     quantity,
//     price,
//     discount,
//     specialPrice,
//     cartId,
//   }) => {
//     const [currentQuantity, setCurrentQuantity] = useState(quantity);
//     const dispatch = useDispatch();

//     const handleQtyIncrease = (cartItems) => {
//         dispatch(increaseCartQuantity(
//             cartItems,
//             toast,
//             currentQuantity,
//             setCurrentQuantity
//         ));
//     };

//     const handleQtyDecrease = (cartItems) => {
//         if (currentQuantity > 1) {
//             const newQuantity = currentQuantity - 1;
//             setCurrentQuantity(newQuantity);
//             dispatch(decreaseCartQuantity(cartItems, newQuantity));
//         }
//     };

//     const removeItemFromCart = (cartItems) => {
//         dispatch(removeFromCart(cartItems, toast));
//     };
    
//     return (
//         <div className="grid md:grid-cols-5 grid-cols-4 md:text-md text-sm gap-4   items-center  border border-slate-200  rounded-md  lg:px-4  py-4 p-2">
//             <div className="md:col-span-2 justify-self-start flex  flex-col gap-2 ">
//                 <div className="flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-0 items-start ">
//                    <h3 className="lg:text-[17px] text-sm font-semibold text-slate-600">
//                     {truncateText(productName)}
//                    </h3>
//                 </div>

//                 <div className="md:w-36 sm:w-24 w-12">
//                     <img 
//                         src={`${import.meta.env.VITE_BACK_END_URL}/images/${image}`}
//                         alt={productName}
//                         className="md:h-36 sm:h-24 h-12 w-full object-cover rounded-md"/>
                

//                 <div className="flex items-start gap-5 mt-3">
//                     <button
//                         onClick={() => removeItemFromCart({
//                             image,
//                             productName,
//                             description,
//                             specialPrice,
//                             price,
//                             productId,
//                             quantity,
//                         })}
//                         className="flex items-center font-semibold space-x-2 px-4 py-1 text-xs border border-rose-600 text-rose-600 rounded-md hover:bg-red-50 transition-colors duration-200">
//                         <HiOutlineTrash size={16} className="text-rose-600"/>
//                         Remove
//                     </button>
//                     </div>
//                 </div>
//             </div>

//             <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
//                 {formatPrice(Number(specialPrice))}
//             </div>

//             <div className="justify-self-center">
//                 <SetQuantity 
//                     quantity={currentQuantity}
//                     cardCounter={true}
//                     handeQtyIncrease={() => handleQtyIncrease({
//                         image,
//                         productName,
//                         description,
//                         specialPrice,
//                         price,
//                         productId,
//                         quantity,
//                     })}
//                     handleQtyDecrease={() => {handleQtyDecrease({
//                         image,
//                         productName,
//                         description,
//                         specialPrice,
//                         price,
//                         productId,
//                         quantity,
//                     })}}/>
//             </div>

//             <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
//                 {formatPrice(Number(currentQuantity) * Number(specialPrice))}
//             </div>
//         </div>
//     )
// };

// export default ItemContent;
// function formatPrice(value) {
//     if (isNaN(value)) return "$0.00";
//     return `$${Number(value).toFixed(2)}`;
// }

// function truncateText(text, maxLength = 40) {
//     if (!text) return "";
//     return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
// }

// //ITEM COMPONENT
// import React, { useState } from "react";
// import SetQuantity from "./SetQuantity";
// import { useDispatch } from "react-redux";
// import {
//   increaseCartQuantity,
//   decreaseCartQuantity,
//   removeFromCart,
// } from "../../store/actions";
// import { toast } from "react-hot-toast";
// import { HiOutlineTrash } from "react-icons/hi";

// const ItemContent = ({
//   productId,
//   productName,
//   image,
//   description,
//   quantity,
//   price,
//   discount,
//   specialPrice,
//   cartId,
// }) => {
//   const [currentQuantity, setCurrentQuantity] = useState(quantity);
//   const dispatch = useDispatch();

//   const handleQtyIncrease = (cartItems) => {
//     dispatch(
//       increaseCartQuantity(cartItems, toast, currentQuantity, setCurrentQuantity)
//     );
//   };

//   const handleQtyDecrease = (cartItems) => {
//     if (currentQuantity > 1) {
//       const newQuantity = currentQuantity - 1;
//       setCurrentQuantity(newQuantity);
//       dispatch(decreaseCartQuantity(cartItems, newQuantity));
//     }
//   };

//   const removeItemFromCart = (cartItems) => {
//     dispatch(removeFromCart(cartItems, toast));
//   };

//   const unit = Number(specialPrice);
//   const lineTotal = (Number(currentQuantity) * unit).toFixed(2);

//   return (
//     // grid-cols-12 תואם לחלוקה של 6/2/2/2
//     <div className="grid grid-cols-12 items-center gap-4 px-4 py-4">
//       {/* Product (6) */}
//       <div className="col-span-12 flex items-start gap-4 md:col-span-6">
//         <div className="h-20 w-20 overflow-hidden rounded-lg border bg-white">
//           <img
//             src={`${import.meta.env.VITE_BACK_END_URL}/images/${image}`}
//             alt={productName}
//             className="h-full w-full object-cover"
//           />
//         </div>

//         <div className="min-w-0">
//           <h3 className="truncate text-sm font-semibold text-slate-800">
//             {truncateText(productName)}
//           </h3>
//           {description ? (
//             <p className="mt-1 line-clamp-2 text-xs text-slate-500">
//               {truncateText(description, 120)}
//             </p>
//           ) : null}

//           <button
//             type="button"
//             onClick={() =>
//               removeItemFromCart({
//                 image,
//                 productName,
//                 description,
//                 specialPrice,
//                 price,
//                 productId,
//                 quantity,
//               })
//             }
//             className="mt-3 inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100"
//           >
//             <HiOutlineTrash size={14} />
//             Remove
//           </button>
//         </div>
//       </div>

//       {/* Price (2) — תוקן מ-4 ל-2 למניעת גלישה */}
//       <div className="col-span-4 hidden text-center text-sm font-semibold text-slate-700 md:col-span-2 md:block">
//         {formatPrice(unit)}
//       </div>

//       {/* Qty (2) */}
//       <div className="col-span-6 md:col-span-2 md:text-center">
//         <SetQuantity
//           quantity={currentQuantity}
//           cardCounter={true}
//           handeQtyIncrease={() =>
//             handleQtyIncrease({
//               image,
//               productName,
//               description,
//               specialPrice,
//               price,
//               productId,
//               quantity,
//             })
//           }
//           handleQtyDecrease={() =>
//             handleQtyDecrease({
//               image,
//               productName,
//               description,
//               specialPrice,
//               price,
//               productId,
//               quantity,
//             })
//           }
//         />
//       </div>

//       {/* Total (2) */}
//       <div className="col-span-2 text-right text-sm font-semibold text-slate-800">
//         {formatPrice(Number(lineTotal))}
//       </div>
//     </div>
//   );
// };

// export default ItemContent;

// function formatPrice(value) {
//   if (isNaN(value)) return "$0.00";
//   return `$${Number(value).toFixed(2)}`;
// }

// function truncateText(text, maxLength = 40) {
//   if (!text) return "";
//   return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
// }



//ITEM COMPONENT
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
                  src={`${import.meta.env.VITE_BACK_END_URL}/images/${image}`}
                  alt={productName}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
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
