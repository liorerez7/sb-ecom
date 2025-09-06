// import React from 'react'
// import { useForm } from 'react-hook-form'
// import InputField from '../shared/InputField' // עדכן נתיב לפי הפרויקט
// import { useDispatch, useSelector } from 'react-redux'
// import { toast } from 'react-hot-toast'
// import { addAddressHandler } from '../../store/actions'
// import { useEffect } from 'react'

// export const AddAddressForm = ({ address, setOpenAddressModal }) => {
//   const dispatch = useDispatch()
//   const { btnLoader } = useSelector((state) => state.errors)

//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     mode: 'onTouched',
//     defaultValues: address
//       ? {
//           buildingName: address.buildingName || '',
//           street: address.street || '',
//           city: address.city || '',
//           state: address.state || '',
//           zipCode: address.zipCode || '',
//           country: address.country || '',
//         }
//       : {
//           buildingName: '',
//           street: '',
//           city: '',
//           state: '',
//           zipCode: '',
//           country: '',
//         },
//   })

//   const onSaveAddressHandler = async (data) => {
    
//     dispatch(addAddressHandler(
//       data, toast, address?.addressId, setOpenAddressModal
//     ));
//   }

//   useEffect(() => {
//     if(address?.addressId) {
//       setValue('buildingName', address?.buildingName);
//       setValue('street', address?.street);
//       setValue('city', address?.city);
//       setValue('state', address?.state);
//       setValue('zipCode', address?.zipCode);
//       setValue('country', address?.country);
//     }
//   }, [address, setValue]);
  

//   return (
//     <form onSubmit={handleSubmit(onSaveAddressHandler)} className="w-full max-w-md">
//       <div className="space-y-4">
//         <InputField
//           label="Building Name"
//           id="buildingName"
//           type="text"
//           placeholder="e.g., Green Towers"
//           required
//           errors={errors}
//           register={register}
//         />

//         <InputField
//           label="Street"
//           id="street"
//           type="text"
//           placeholder="e.g., 123 Main St"
//           required
//           errors={errors}
//           register={register}
//         />

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <InputField
//             label="City"
//             id="city"
//             type="text"
//             placeholder="e.g., Tel Aviv"
//             required
//             errors={errors}
//             register={register}
//           />

//           <InputField
//             label="State"
//             id="state"
//             type="text"
//             placeholder="e.g., Center"
//             required
//             errors={errors}
//             register={register}
//             min={2}
//           />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <InputField
//             label="ZipCode"
//             id="zipCode"
//             type="text"
//             placeholder="e.g., 6100000"
//             required
//             errors={errors}
//             register={register}
//             rules={{
//               pattern: {
//                 value: /^\d{4,10}$/,
//                 message: 'Enter a valid code (4–10 digits)',
//               },
//             }}
//           />

//           <InputField
//             label="Country"
//             id="country"
//             type="text"
//             placeholder="e.g., Israel"
//             required
//             errors={errors}
//             register={register}
//             rules={{
//               pattern: {
//                 value: /^[A-Za-z\s'-]{2,}$/,
//                 message: 'Enter a valid country name',
//               },
//             }}
//           />
//         </div>

//         <div className="pt-2">
//           <button
//             type="submit"
//             disabled={btnLoader}
//             className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
//           >
//             {btnLoader ? 'Saving…' : 'Save'}
//           </button>
//         </div>
//       </div>
//     </form>
//   )
// }

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../shared/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { addAddressHandler } from '../../store/actions';

export const AddAddressForm = ({ address, setOpenAddressModal }) => {
  const dispatch = useDispatch();
  const { btnLoader } = useSelector((state) => state.errors);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: address
      ? {
          buildingName: address.buildingName || '',
          street: address.street || '',
          city: address.city || '',
          state: address.state || '',
          zipCode: address.zipCode || '',
          country: address.country || '',
        }
      : {
          buildingName: '',
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
        },
  });

  const onSaveAddressHandler = async (data) => {
    dispatch(addAddressHandler(data, toast, address?.addressId, setOpenAddressModal));
  };

  useEffect(() => {
    if (address?.addressId) {
      setValue('buildingName', address?.buildingName);
      setValue('street', address?.street);
      setValue('city', address?.city);
      setValue('state', address?.state);
      setValue('zipCode', address?.zipCode);
      setValue('country', address?.country);
    } else {
      // Ensure clean form when adding a new address
      reset();
    }
  }, [address, setValue, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSaveAddressHandler)}
      className="w-full"
      aria-describedby="address-form-help"
    >
      <fieldset className="w-full max-w-md space-y-4" dir="auto">
        <legend className="sr-only">Address details</legend>

        <InputField
          label="Building Name"
          id="buildingName"
          type="text"
          placeholder="e.g., Green Towers"
          required
          errors={errors}
          register={register}
        />

        <InputField
          label="Street"
          id="street"
          type="text"
          placeholder="e.g., 123 Main St"
          required
          errors={errors}
          register={register}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InputField
            label="City"
            id="city"
            type="text"
            placeholder="e.g., Tel Aviv"
            required
            errors={errors}
            register={register}
          />
          <InputField
            label="State"
            id="state"
            type="text"
            placeholder="e.g., Center"
            required
            errors={errors}
            register={register}
            min={2}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InputField
            label="ZipCode"
            id="zipCode"
            type="text"
            placeholder="e.g., 6100000"
            required
            errors={errors}
            register={register}
            rules={{
              pattern: {
                value: /^\d{4,10}$/,
                message: 'Enter a valid code (4–10 digits)',
              },
            }}
          />

          <InputField
            label="Country"
            id="country"
            type="text"
            placeholder="e.g., Israel"
            required
            errors={errors}
            register={register}
            rules={{
              pattern: {
                value: /^[A-Za-z\s'-]{2,}$/,
                message: 'Enter a valid country name',
              },
            }}
          />
        </div>

        <p id="address-form-help" className="text-xs text-gray-500">
          Your address is used for shipping and invoices.
        </p>

        <div className="pt-2">
          <button
            type="submit"
            disabled={btnLoader}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white outline-none transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            aria-busy={btnLoader ? 'true' : 'false'}
            aria-live="polite"
          >
            {btnLoader ? 'Saving…' : 'Save'}
          </button>
        </div>
      </fieldset>
    </form>
  );
};
