import React from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { FaTimes } from 'react-icons/fa';

export const AddressInfoModal = ({ open, setOpen, title = 'Add Address', children }) => {
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            className="relative z-50"
            aria-label={title}
        >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 sm:p-6 overflow-y-auto">
                <DialogPanel className="w-full max-w-lg my-8 rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900 flex flex-col max-h-[90vh]">
                    <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700 flex-shrink-0">
                        <DialogTitle className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
                            {title}
                        </DialogTitle>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="rounded-md p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-gray-800"
                            aria-label="Close"
                        >
                            <FaTimes aria-hidden="true" />
                        </button>
                    </div>

                    <div className="p-4 sm:p-6 overflow-y-auto flex-1">{children}</div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};