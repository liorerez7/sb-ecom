import React, { useState } from 'react'
import { Skeleton } from '../shared/Skeleton'
import { FaAddressBook } from 'react-icons/fa'
import { AddAddressForm } from './AddAddressForm'
import { AddressInfoModal } from './AddressInfoModal'
import { useDispatch, useSelector } from 'react-redux'
import AddressList from '../AddressList'
import DeleteModal from './DeleteModal'
import { toast } from 'react-hot-toast'
import { deleteUserAddress } from '../../store/actions'

export const AddressInfo = ({ address }) => {
  const [openAddressModal, setOpenAddressModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState(null)

  const dispatch = useDispatch();

  const addNewAddressHandler = () => {
    setSelectedAddress(null)
    setOpenAddressModal(true)
  };

  const deleteAddressHandler = () => {
    dispatch(deleteUserAddress(
      toast, selectedAddress?.addressId, setOpenDeleteModal
    ))
  };

  const noAddressExist = !address || address.length === 0;
  const {isLoading, btnLoader} = useSelector((state) => state.errors);

  return (
    <div className="p-4">
      {noAddressExist ? (
        <div className="flex flex-col items-start gap-3 rounded-md border border-dashed border-gray-300 p-4">
          <p className="text-gray-700">Please add an address</p>
          <button
            onClick={addNewAddressHandler}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <FaAddressBook />
            Add Address
          </button>
        </div>
      ) : (
        <div>
          <h1 className="mb-3 text-lg font-semibold">Select Address</h1>
          {isLoading ? (
            <div>
              <Skeleton />
            </div>
          ) : (
            <>
            <div>
              <AddressList
                addresses={address}
                setSelectedAddress={setSelectedAddress}
                setOpenAddressModal={setOpenAddressModal}
                setOpenDeleteModal={setOpenDeleteModal}
               />
            </div>

            {address.length > 0 && (
              <div>
                <button onClick={addNewAddressHandler}>
                  add More Address
                </button>
              </div>
            )}
            </>

          )}
        </div>
      )}

      <AddressInfoModal open={openAddressModal} setOpen={setOpenAddressModal} title="Add Address">
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
        >
      </DeleteModal>
    </div>
  )
}
