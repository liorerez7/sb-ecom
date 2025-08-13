import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

function ProductViewModal({ open, setOpen, product, isAvailable }) {
  
  function close() {
    setOpen(false);
  }

  // רק בדיקה אם אין מוצר - ה-Dialog יטפל ב-open state
  if (!product) return null;

  const { 
    id,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice
  } = product;

  return (
    <Dialog open={open} as="div" className="relative z-10 focus:outline-none" onClose={close}>
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 transition-opacity" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-lg rounded-xl bg-white shadow-xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <DialogTitle as="h3" className="text-xl font-semibold text-gray-900">
                  {productName}
                </DialogTitle>
                <button
                  onClick={close}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-4">
                <img
                  src={image}
                  alt={productName}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {description}
              </p>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                  {specialPrice && isAvailable ? (
                    <>
                      <span className="text-gray-500 text-sm line-through">
                        ${Number(price).toFixed(2)}
                      </span>
                      <span className="text-2xl font-bold text-green-600">
                        ${Number(specialPrice).toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-gray-900">
                      {isAvailable ? `${Number(price).toFixed(2)}` : 'Out of Stock'}
                    </span>
                  )}
                </div>
                
                <div className="text-sm text-gray-500">
                  {isAvailable ? `${quantity} in stock` : 'Out of stock'}
                </div>
              </div>
              
              <div className="flex gap-3">
                {isAvailable ? (
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
                    Add to Cart
                  </button>
                ) : (
                  <button disabled className="flex-1 bg-gray-300 text-gray-500 font-semibold py-3 px-4 rounded-lg cursor-not-allowed">
                    Out of Stock
                  </button>
                )}
                
                <button
                  onClick={close}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}


export default ProductViewModal