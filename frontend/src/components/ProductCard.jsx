import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

function ProductViewModal({ open, setOpen, product, isAvailable }) {
  if (!product) return null;

  const close = () => setOpen(false);

  const {
    id,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
  } = product;

  const hasDiscount = isAvailable && Number(discount) > 0 && specialPrice;

  return (
    <Dialog open={open} as="div" className="relative z-50 focus:outline-none" onClose={close}>
      <DialogBackdrop className="fixed inset-0 bg-black/50 data-[closed]:opacity-0 transition-opacity" />
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <DialogTitle className="text-xl font-semibold tracking-tight text-gray-900">
                {productName}
              </DialogTitle>
              <button
                onClick={close}
                aria-label="Close"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              {/* Image */}
              <div className="overflow-hidden rounded-xl border bg-gray-50">
                <img
                  src={image}
                  alt={productName}
                  className="h-72 w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col">
                <p className="text-gray-600 leading-relaxed mb-4">
                  {description}
                </p>

                {/* Price section */}
                <div className="mb-4">
                  {hasDiscount ? (
                    <div className="flex items-end gap-3">
                      <span className="text-gray-500 line-through text-sm">
                        ${Number(price).toFixed(2)}
                      </span>
                      <span className="text-3xl font-bold text-green-600">
                        ${Number(specialPrice).toFixed(2)}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 text-xs font-semibold px-2 py-1">
                        −{Number(discount)}%
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-end gap-3">
                      <span className="text-3xl font-bold text-gray-900">
                        {isAvailable ? `$${Number(price).toFixed(2)}` : 'Out of Stock'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Stock indicator */}
                <div className="mb-6">
                  {isAvailable ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium px-3 py-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      {quantity} in stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5">
                      <span className="h-2 w-2 rounded-full bg-gray-400" />
                      Out of stock
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-auto flex gap-3">
                  {isAvailable ? (
                    <button
                      className="flex-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition"
                      onClick={() => {}}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex-1 rounded-lg bg-gray-200 text-gray-500 font-semibold h-11 cursor-not-allowed"
                    >
                      Out of Stock
                    </button>
                  )}
                  <button
                    onClick={close}
                    className="rounded-lg border border-gray-300 h-11 px-5 font-semibold text-gray-700 hover:bg-gray-50 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default ProductViewModal;
