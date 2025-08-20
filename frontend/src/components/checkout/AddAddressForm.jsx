import React from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../shared/InputField' // עדכן נתיב לפי הפרויקט
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { addAddressHandler } from '../../store/actions'

export const AddAddressForm = ({ address, setOpenAddressModal }) => {
  const dispatch = useDispatch()
  const { btnLoader } = useSelector((state) => state.errors)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: address
      ? {
          buildingName: address.buildingName || '',
          street: address.street || '',
          city: address.city || '',
          state: address.state || '',
          pinCode: address.pinCode || '',
          country: address.country || '',
        }
      : {
          buildingName: '',
          street: '',
          city: '',
          state: '',
          pinCode: '',
          country: '',
        },
  })

  const onSaveAddressHandler = async (data) => {
    try {
      await dispatch(
        addAddressHandler(data, toast, address?.addressId, setOpenAddressModal)
      )
    } finally {
      // אם לא רוצים לאפס כשעורכים, אפשר לבדוק !address לפני reset
      reset({
        buildingName: '',
        street: '',
        city: '',
        state: '',
        pinCode: '',
        country: '',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSaveAddressHandler)} className="w-full max-w-md">
      <div className="space-y-4">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="PinCode"
            id="pinCode"
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

        <div className="pt-2">
          <button
            type="submit"
            disabled={btnLoader}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {btnLoader ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </form>
  )
}
