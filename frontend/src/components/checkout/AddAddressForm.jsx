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

    const fillDemoData = () => {
        setValue('buildingName', 'Tower Building');
        setValue('street', '123 Dizengoff Street');
        setValue('city', 'Tel Aviv');
        setValue('state', 'Center');
        setValue('zipCode', '6100000');
        setValue('country', 'Israel');
    };

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

                {!address?.addressId && (
                    <button
                        type="button"
                        onClick={fillDemoData}
                        className="w-full rounded-md border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 outline-none transition hover:border-gray-400 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
                    >
                        Fill Demo Fields
                    </button>
                )}

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

                <div className="pt-2 pb-safe">
                    <button
                        type="submit"
                        disabled={btnLoader}
                        className="w-full min-h-[44px] touch-manipulation rounded-md bg-blue-600 px-4 py-3 text-sm font-medium text-white outline-none transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:bg-blue-800"
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