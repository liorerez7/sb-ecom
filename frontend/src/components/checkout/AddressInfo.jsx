
import React, { useState } from 'react';
import { Skeleton } from '../shared/Skeleton';
import { FaAddressBook, FaPlus } from 'react-icons/fa';
import { AddAddressForm } from './AddAddressForm';
import { AddressInfoModal } from './AddressInfoModal';
import { useDispatch, useSelector } from 'react-redux';
import AddressList from '../AddressList';
import DeleteModal from './DeleteModal';
import { toast } from 'react-hot-toast';
import { deleteUserAddress } from '../../store/actions';

export const AddressInfo = ({ address }) => {
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const dispatch = useDispatch();
  const { isLoading, btnLoader } = useSelector((state) => state.errors);

  const addNewAddressHandler = () => {
    setSelectedAddress(null);
    setOpenAddressModal(true);
  };

  const deleteAddressHandler = () => {
    dispatch(
      deleteUserAddress(toast, selectedAddress?.addressId, setOpenDeleteModal)
    );
  };

  const noAddressExist = !address || address.length === 0;

  return (
    <section className="p-4 sm:p-6" aria-label="Address management" dir="auto">
      {noAddressExist ? (
        <div
          className="flex w-full flex-col items-start gap-3 rounded-lg border border-dashed border-gray-300 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
            <FaAddressBook aria-hidden="true" className="opacity-80" />
            <p className="text-sm sm:text-base">Please add an address</p>
          </div>

          <button
            type="button"
            onClick={addNewAddressHandler}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white outline-none transition hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
            aria-label="Add a new address"
          >
            <FaPlus aria-hidden="true" />
            Add Address
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <h1
            id="address-list-heading"
            className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100"
          >
            Select Address
          </h1>

          {isLoading ? (
            <div className="space-y-3">
              <Skeleton />
              <Skeleton />
            </div>
          ) : (
            <>
              <AddressList
                addresses={address}
                setSelectedAddress={setSelectedAddress}
                setOpenAddressModal={setOpenAddressModal}
                setOpenDeleteModal={setOpenDeleteModal}
                ariaLabelledBy="address-list-heading"
              />

              {address.length > 0 && (
                <div>
                  <button
                    type="button"
                    onClick={addNewAddressHandler}
                    className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 outline-none transition hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                    aria-label="Add another address"
                  >
                    <FaPlus aria-hidden="true" />
                    Add More Address
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      <AddressInfoModal
        open={openAddressModal}
        setOpen={setOpenAddressModal}
        title={selectedAddress ? 'Edit Address' : 'Add Address'}
      >
        <AddAddressForm
          address={selectedAddress || undefined}
          setOpenAddressModal={setOpenAddressModal}
        />
      </AddressInfoModal>

      <DeleteModal
        open={openDeleteModal}
        loader={btnLoader}
        setOpen={setOpenDeleteModal}
        title="Delete Address"
        onDeleteHandler={deleteAddressHandler}
      />
    </section>
  );
};