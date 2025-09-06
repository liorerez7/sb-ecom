// import React from 'react';
// import { Dialog } from '@headlessui/react';
// import { XMarkIcon } from '@heroicons/react/24/outline';

// export const DeleteModal = ({ open, setOpen, title, onDeleteHandler, loader }) => {
//     return (
//         <Dialog
//             open={open}
//             onClose={setOpen}
//             className="fixed inset-0 z-50 flex items-center justify-center"
//         >
//             <div className="fixed inset-0 bg-black bg-opacity-40" aria-hidden="true" />
//             <div className="fixed inset-0 flex items-center justify-center z-50">
//                 <Dialog.Panel
//                     className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6"
//                     onClick={e => e.stopPropagation()}
//                 >
//                     <button
//                         className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
//                         onClick={() => setOpen(false)}
//                         aria-label="Close"
//                     >
//                         <XMarkIcon className="h-5 w-5" />
//                     </button>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
//                     <p className="text-gray-600 mb-6">
//                         Are you sure you want to delete this item? This action cannot be undone.
//                     </p>
//                     <div className="flex justify-end gap-2">
//                         <button
//                             className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
//                             onClick={() => setOpen(false)}
//                             disabled={loader}
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 flex items-center"
//                             onClick={onDeleteHandler}
//                             disabled={loader}
//                         >
//                             {loader && (
//                                 <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
//                                     <circle
//                                         className="opacity-25"
//                                         cx="12"
//                                         cy="12"
//                                         r="10"
//                                         stroke="currentColor"
//                                         strokeWidth="4"
//                                         fill="none"
//                                     />
//                                     <path
//                                         className="opacity-75"
//                                         fill="currentColor"
//                                         d="M4 12a8 8 0 018-8v8z"
//                                     />
//                                 </svg>
//                             )}
//                             Delete
//                         </button>
//                     </div>
//                 </Dialog.Panel>
//             </div>
//         </Dialog>
//     );
// };

// export default DeleteModal;

import React from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export const DeleteModal = ({ open, setOpen, title, onDeleteHandler, loader }) => {
  return (
    <Dialog
      open={open}
      onClose={setOpen}
      className="relative z-50"
    >
      {/* Dimmed background (softer than before) */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Centered modal container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          className="w-full max-w-md overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl outline-none dark:border-gray-700 dark:bg-gray-900"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-700">
            <DialogTitle className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </DialogTitle>
            <button
              type="button"
              className="rounded-md p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-gray-800"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Body */}
          <div className="px-5 py-5" dir="auto">
            <p id="delete-modal-desc" className="text-sm text-gray-600 dark:text-gray-300">
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-2 border-t border-gray-200 px-5 py-4 dark:border-gray-700">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 outline-none transition hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              onClick={() => setOpen(false)}
              disabled={loader}
            >
              Cancel
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white outline-none transition hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-70"
              onClick={onDeleteHandler}
              disabled={loader}
              aria-busy={loader ? 'true' : 'false'}
              aria-describedby="delete-modal-desc"
            >
              {loader && (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
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
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DeleteModal;
