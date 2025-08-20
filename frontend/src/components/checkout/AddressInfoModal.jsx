import React from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

export const AddressInfoModal = ({ open, setOpen, title = 'Add Address', children }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
          <DialogTitle className="mb-4 text-lg font-semibold text-gray-800">{title}</DialogTitle>
          <div>{children}</div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
