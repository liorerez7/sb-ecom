import React from 'react';
import { FaBuilding, FaCheckCircle, FaStreetView, FaEdit, FaTrash } from 'react-icons/fa';
import { MdLocationCity, MdPinDrop, MdPublic } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserCheckoutAddress } from '../store/actions';



function AddressList({ addresses, setSelectedAddress, setOpenAddressModal, setOpenDeleteModal}) {
    // Dummy selected address for demonstration; replace with real logic as needed
    const selectedUserCheckoutAddress = useSelector(
    (state) => state.auth.selectedUserCheckoutAddress
    );
    const dispatch = useDispatch();

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

    return (
        <div className="space-y-4">
            {addresses.map((address) => (
                <div
                    key={address.addressId}
                    onClick={() => handleAddressSelection(address)}
                    className={`p-4 border border-gray-300 rounded-md cursor-pointer ${
                        selectedUserCheckoutAddress?.addressId === address.addressId
                            ? 'border-blue-500 bg-amber-600 text-white'
                            : 'bg-green-500 text-white'
                    }`}
                >
                    <div>
                        <FaBuilding size={14} className="mr-2 text-gray-600" />
                        <p>{address.buildingName}</p>
                        {selectedUserCheckoutAddress?.addressId === address.addressId && (
                        <FaCheckCircle size={14} className="text-green-500 ml-2" />
                        )}
                    </div>
                    <div>
                        <FaStreetView size={14} className="mr-2 text-gray-600" />
                        <p>{address.street}</p>
                    </div>
                    <div>
                        <MdLocationCity size={14} className="mr-2 text-gray-600" />
                        <p>{address.city}, {address.state}</p>
                    </div>
                    <div>
                        <MdPinDrop size={14} className="mr-2 text-gray-600" />
                        <p>{address.zipCode}</p>
                    </div>
                    <div>
                        <MdPublic size={14} className="mr-2 text-gray-600" />
                        <p>{address.country}</p>
                    </div>
                    <div>
                        <button onClick={() => onEditButtonHandler(address)}>
                            <FaEdit size={17} className="text-blue-600" />
                        </button>
                        <button onClick={() => onDeleteButtonHandler(address)}>
                            <FaTrash size={17} className="text-rose-600" />
                        </button>
                    </div>
                </div>
                
            ))}
        </div>
    );
}

export default AddressList;