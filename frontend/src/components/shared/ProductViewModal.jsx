import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { FaShoppingCart, FaTimes, FaTag, FaWarehouse } from 'react-icons/fa'

function ProductViewModal({ open, setOpen, product, isAvailable }) {
  
  function close() {
    setOpen(false);
  }

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

  const discountPercentage = specialPrice && price ? 
    Math.round(((Number(price) - Number(specialPrice)) / Number(price)) * 100) : 0;

  return (
    <Dialog 
      open={open} 
      as="div" 
      className="relative z-50 focus:outline-none" 
      onClose={close}
    >
      <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300" />
      
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            transition
            className="w-full max-w-2xl transform rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 transition-all duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            {/* Modal Header */}
            <div className="relative p-6 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <DialogTitle as="h2" className="text-2xl font-bold text-gray-900 leading-tight">
                    {productName}
                  </DialogTitle>
                  {!isAvailable && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-red-100 text-red-800 rounded-full">
                        <FaWarehouse className="mr-1.5 text-xs" />
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={close}
                  className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  aria-label="Close modal"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="px-6 pb-6">
              {/* Product Image */}
              <div className="relative mb-6 rounded-xl overflow-hidden bg-gray-50">
                <img
                  src={image}
                  alt={productName}
                  className="w-full h-80 object-cover"
                />
                
                {/* Discount Badge */}
                {specialPrice && isAvailable && discountPercentage > 0 && (
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center px-3 py-1.5 bg-green-500 text-white rounded-full text-sm font-medium shadow-lg">
                      <FaTag className="mr-1.5 text-xs" />
                      {discountPercentage}% OFF
                    </div>
                  </div>
                )}
              </div>
              
              {/* Product Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {description}
                </p>
              </div>
              
              {/* Pricing and Stock Section */}
              <div className="bg-gray-50 rounded-xl p-5 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col space-y-1">
                    {specialPrice && isAvailable ? (
                      <div className="space-y-1">
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl font-bold text-gray-900">
                            ${Number(specialPrice).toFixed(2)}
                          </span>
                          <span className="px-2 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-md">
                            Save ${(Number(price) - Number(specialPrice)).toFixed(2)}
                          </span>
                        </div>
                        <span className="text-lg text-gray-500 line-through">
                          ${Number(price).toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className={`text-3xl font-bold ${
                        isAvailable ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {isAvailable ? `$${Number(price).toFixed(2)}` : 'Out of Stock'}
                      </span>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <div className={`flex items-center text-sm ${
                      isAvailable ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <FaWarehouse className="mr-1.5" />
                      <span className="font-medium">
                        {isAvailable ? `${quantity} in stock` : 'Unavailable'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                {isAvailable ? (
                  <button 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group"
                    aria-label={`Add ${productName} to cart`}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <FaShoppingCart className="group-hover:scale-110 transition-transform duration-200" />
                      <span>Add to Cart</span>
                    </span>
                  </button>
                ) : (
                  <button 
                    disabled 
                    className="flex-1 bg-gray-200 text-gray-500 font-semibold py-4 px-6 rounded-xl cursor-not-allowed"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <FaWarehouse />
                      <span>Out of Stock</span>
                    </span>
                  </button>
                )}
                
                <button
                  onClick={close}
                  className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
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