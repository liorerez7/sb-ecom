// import React from 'react';
// import { FaBuilding, FaCheckCircle, FaStreetView, FaEdit, FaTrash } from 'react-icons/fa';
// import { MdLocationCity, MdPinDrop, MdPublic } from 'react-icons/md';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectUserCheckoutAddress } from '../store/actions';



// function AddressList({ addresses, setSelectedAddress, setOpenAddressModal, setOpenDeleteModal}) {
//     // Dummy selected address for demonstration; replace with real logic as needed
//     const selectedUserCheckoutAddress = useSelector(
//     (state) => state.auth.selectedUserCheckoutAddress
//     );
//     const dispatch = useDispatch();

//     const handleAddressSelection = (address) => {
//         dispatch(selectUserCheckoutAddress(address));
//     };

//     const onEditButtonHandler = (address) => {
//         setSelectedAddress(address);
//         setOpenAddressModal(true);
//     };

//     const onDeleteButtonHandler = (address) => {
//         setSelectedAddress(address);
//         setOpenDeleteModal(true);
//     };

//     return (
//         <div className="space-y-4">
//             {addresses.map((address) => (
//                 <div
//                     key={address.addressId}
//                     onClick={() => handleAddressSelection(address)}
//                     className={`p-4 border border-gray-300 rounded-md cursor-pointer ${
//                         selectedUserCheckoutAddress?.addressId === address.addressId
//                             ? 'border-blue-500 bg-amber-600 text-white'
//                             : 'bg-green-500 text-white'
//                     }`}
//                 >
//                     <div>
//                         <FaBuilding size={14} className="mr-2 text-gray-600" />
//                         <p>{address.buildingName}</p>
//                         {selectedUserCheckoutAddress?.addressId === address.addressId && (
//                         <FaCheckCircle size={14} className="text-green-500 ml-2" />
//                         )}
//                     </div>
//                     <div>
//                         <FaStreetView size={14} className="mr-2 text-gray-600" />
//                         <p>{address.street}</p>
//                     </div>
//                     <div>
//                         <MdLocationCity size={14} className="mr-2 text-gray-600" />
//                         <p>{address.city}, {address.state}</p>
//                     </div>
//                     <div>
//                         <MdPinDrop size={14} className="mr-2 text-gray-600" />
//                         <p>{address.zipCode}</p>
//                     </div>
//                     <div>
//                         <MdPublic size={14} className="mr-2 text-gray-600" />
//                         <p>{address.country}</p>
//                     </div>
//                     <div>
//                         <button onClick={() => onEditButtonHandler(address)}>
//                             <FaEdit size={17} className="text-blue-600" />
//                         </button>
//                         <button onClick={() => onDeleteButtonHandler(address)}>
//                             <FaTrash size={17} className="text-rose-600" />
//                         </button>
//                     </div>
//                 </div>
                
//             ))}
//         </div>
//     );
// }

// export default AddressList;

import React from 'react';
import {
  FaBuilding,
  FaCheckCircle,
  FaStreetView,
  FaEdit,
  FaTrash,
} from 'react-icons/fa';
import { MdLocationCity, MdPinDrop, MdPublic } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserCheckoutAddress } from '../store/actions';

/**
 * Visual + a11y upgrades:
 * - Renders as a semantic list with role="radiogroup"; each card acts as role="radio"
 * - Keyboard support: Enter/Space selects; focus ring visible
 * - Improved contrast + consistent spacing; selected state uses ring + subtle bg
 * - Action buttons (edit/delete) stop propagation so they don’t trigger select
 */
function AddressList({
  addresses,
  setSelectedAddress,
  setOpenAddressModal,
  setOpenDeleteModal,
  ariaLabelledBy,
}) {
  const selectedUserCheckoutAddress = useSelector(
    (state) => state.auth.selectedUserCheckoutAddress
  );
  const dispatch = useDispatch();

  const isSelected = (a) =>
    selectedUserCheckoutAddress?.addressId === a.addressId;

  const handleAddressSelection = (address) => {
    dispatch(selectUserCheckoutAddress(address));
  };

  const onEditButtonHandler = (address) => {
    setSelectedAddress(address);
    setOpenAddressModal(true);
  };

  const onDeleteButtonHandler = (address) => {
    setSelectedAddress(address);
    setOpenDeleteModal(true);
  };

  const onKeyActivate = (e, address) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleAddressSelection(address);
    }
  };

  return (
    <ul
      className="space-y-3"
      role="radiogroup"
      aria-labelledby={ariaLabelledBy}
      dir="auto"
    >
      {addresses.map((address) => {
        const selected = isSelected(address);

        return (
          <li key={address.addressId}>
            <div
              role="radio"
              aria-checked={selected}
              tabIndex={0}
              onClick={() => handleAddressSelection(address)}
              onKeyDown={(e) => onKeyActivate(e, address)}
              className={[
                'cursor-pointer rounded-lg border p-4 transition shadow-sm outline-none',
                'hover:shadow-md',
                selected
                  ? 'border-blue-600 ring-2 ring-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900',
                'focus-visible:ring-2 focus-visible:ring-blue-500',
              ].join(' ')}
            >
              {/* visually-hidden native input improves SR forms navigation without impacting logic */}
              <input
                type="radio"
                name="selectedAddress"
                checked={selected}
                onChange={() => handleAddressSelection(address)}
                className="sr-only"
                aria-hidden="true"
                tabIndex={-1}
              />

              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="mb-1 flex items-center gap-2">
                    <FaBuilding
                      size={14}
                      aria-hidden="true"
                      className="opacity-70"
                    />
                    <p className="truncate text-sm sm:text-base font-medium text-gray-900 dark:text-gray-100">
                      {address.buildingName}
                    </p>
                    {selected && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-600/10 px-2 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300">
                        <FaCheckCircle aria-hidden="true" />
                        Selected
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-1 text-sm text-gray-700 dark:text-gray-200 sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <FaStreetView size={14} aria-hidden="true" />
                      <span className="truncate">{address.street}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MdLocationCity size={16} aria-hidden="true" />
                      <span className="truncate">
                        {address.city}, {address.state}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MdPinDrop size={16} aria-hidden="true" />
                      <span className="truncate">{address.zipCode}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MdPublic size={16} aria-hidden="true" />
                      <span className="truncate">{address.country}</span>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditButtonHandler(address);
                    }}
                    title="Edit address"
                    aria-label="Edit address"
                    className="rounded-md p-2 text-blue-700 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-300 dark:hover:bg-blue-900/20"
                  >
                    <FaEdit size={16} aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteButtonHandler(address);
                    }}
                    title="Delete address"
                    aria-label="Delete address"
                    className="rounded-md p-2 text-rose-700 hover:bg-rose-50 focus-visible:ring-2 focus-visible:ring-rose-500 dark:text-rose-300 dark:hover:bg-rose-900/20"
                  >
                    <FaTrash size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default AddressList;
