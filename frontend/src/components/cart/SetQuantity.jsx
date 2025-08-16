// const btnStyles = "border-[1.2px] border-slate-800 px-3 py-1 rounded-sm";
// const SetQuantity = ({
//     quantity,
//     cardCounter,
//     handeQtyIncrease,
//     handleQtyDecrease,
// }) => {
//    return (
//    <div className="flex gap-8 items-center">
//         {cardCounter ? null : <div className="font-semibold">QUANTITY</div>}
//         <div className="flex md:flex-row flex-col gap-4 items-center lg:text-[22px] text-sm">
//             <button
//                 disabled={quantity<=1}
//                 className={btnStyles}
//                 onClick={handleQtyDecrease}>
//                 -
//             </button>
//                 <div className="text-red-500">{quantity}</div>
//             <button
//                 className={btnStyles}
//                 onClick={handeQtyIncrease}>
//                 +
//             </button>
//         </div>
//     </div>
//    );
// };

// export default SetQuantity;


// // SET QUANTITY:
// import React from "react";
// import { MdAdd, MdRemove } from "react-icons/md";

// const btnBase =
//   "inline-flex h-9 w-9 items-center justify-center rounded-md border text-slate-700 hover:bg-slate-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40";
// const qtyBox =
//   "min-w-10 select-none text-center text-sm font-semibold text-slate-800";

// const SetQuantity = ({
//   quantity,
//   cardCounter,
//   handeQtyIncrease,
//   handleQtyDecrease,
// }) => {
//   return (
//     <div className="flex items-center gap-3">
//       {cardCounter ? null : (
//         <div className="mr-2 text-xs font-medium uppercase tracking-wide text-slate-500">
//           Quantity
//         </div>
//       )}

//       <div className="flex items-center gap-2">
//         <button
//           type="button"
//           aria-label="Decrease quantity"
//           title={quantity <= 1 ? "Minimum 1" : "Decrease"}
//           className={btnBase}
//           onClick={handleQtyDecrease}
//           disabled={quantity <= 1}
//         >
//           <MdRemove />
//         </button>

//         <div className={qtyBox}>{Number(quantity) || 1}</div>

//         <button
//           type="button"
//           aria-label="Increase quantity"
//           title="Increase"
//           className={btnBase}
//           onClick={handeQtyIncrease}
//         >
//           <MdAdd />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SetQuantity;

//SET QUANTITY
import React from "react";
import { MdAdd, MdRemove } from "react-icons/md";

const SetQuantity = ({
  quantity,
  cardCounter,
  handeQtyIncrease,
  handleQtyDecrease,
}) => {
  return (
    <div className="flex items-center gap-3">
      {!cardCounter && (
        <div className="mr-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
          Qty
        </div>
      )}

      <div className="inline-flex items-center rounded-lg border-2 border-slate-200 bg-white shadow-sm">
        <button
          type="button"
          aria-label="Decrease quantity"
          title={quantity <= 1 ? "Minimum quantity is 1" : "Decrease quantity"}
          className="flex h-10 w-10 items-center justify-center rounded-l-lg text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
          onClick={handleQtyDecrease}
          disabled={quantity <= 1}
        >
          <MdRemove size={18} />
        </button>

        <div className="flex h-10 min-w-[3rem] items-center justify-center border-x border-slate-200 px-3 text-sm font-bold text-slate-900 bg-slate-50">
          {Number(quantity) || 1}
        </div>

        <button
          type="button"
          aria-label="Increase quantity"
          title="Increase quantity"
          className="flex h-10 w-10 items-center justify-center rounded-r-lg text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95"
          onClick={handeQtyIncrease}
        >
          <MdAdd size={18} />
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;