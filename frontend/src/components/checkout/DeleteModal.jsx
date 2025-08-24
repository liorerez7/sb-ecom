import React from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export const DeleteModal = ({ open, setOpen, title, onDeleteHandler, loader }) => {
    return (
        <Dialog
            open={open}
            onClose={setOpen}
            className="fixed inset-0 z-50 flex items-center justify-center"
        >
            <div className="fixed inset-0 bg-black bg-opacity-40" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <Dialog.Panel
                    className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6"
                    onClick={e => e.stopPropagation()}
                >
                    <button
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setOpen(false)}
                        aria-label="Close"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
                    <p className="text-gray-600 mb-6">
                        Are you sure you want to delete this item? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-2">
                        <button
                            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                            onClick={() => setOpen(false)}
                            disabled={loader}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 flex items-center"
                            onClick={onDeleteHandler}
                            disabled={loader}
                        >
                            {loader && (
                                <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8z"
                                    />
                                </svg>
                            )}
                            Delete
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default DeleteModal;