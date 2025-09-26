import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import { useDispatch } from "react-redux";
import { truncateText } from "../../utils/truncateText";
import { addToCart } from "../../store/actions";
import toast from "react-hot-toast";

const ProductCard = ({
  productId,
  productName,
  image,
  description,
  quantity,
  price,
  discount,
  specialPrice,
  disabledModal = false,
}) => {
  const [openProductViewModal, setOpenProductViewModal] = useState(false);
  const [selectedViewProduct, setSelectedViewProduct] = useState(null);
  const btnLoader = false;
  const isAvailable = quantity && Number(quantity) > 0;
  const dispatch = useDispatch();

  const openModalWith = () => {
    if (disabledModal) return;
    setSelectedViewProduct({
      productId,
      productName,
      image,
      description,
      quantity,
      price,
      discount,
      specialPrice,
    });
    setOpenProductViewModal(true);
  };

  const addToCartHandler = (cartItems) => {
    dispatch(addToCart(cartItems, 1, toast));
  };

  return (
    <div className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] hover:border-gray-200 hover:-translate-y-1">
      {/* Product Image Container */}
      <div 
        onClick={openModalWith} 
        className="relative w-full overflow-hidden aspect-[4/3] bg-gray-50"
        role={!disabledModal ? "button" : undefined}
        tabIndex={!disabledModal ? 0 : undefined}
        onKeyDown={!disabledModal ? (e) => e.key === 'Enter' && openModalWith() : undefined}
        aria-label={!disabledModal ? `View ${productName} details` : undefined}
      >
        <img
          className={`w-full h-full object-cover transition-transform duration-500 ${
            !disabledModal ? 'cursor-pointer group-hover:scale-110' : ''
          }`}
          src={image}
          alt={productName}
          loading="lazy"
        />
        
        {/* Overlay for better image interaction feedback */}
        {!disabledModal && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        )}

        {/* Stock Badge */}
        {!isAvailable && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
              Out of Stock
            </span>
          </div>
        )}

        {/* Discount Badge */}
        {specialPrice && isAvailable && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
              Save ${(Number(price) - Number(specialPrice)).toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* Product Content */}
      <div className="p-5">
        {/* Product Title */}
        <h2 
          onClick={openModalWith} 
          className={`text-lg font-semibold text-gray-900 mb-2 leading-tight ${
            !disabledModal ? 'cursor-pointer hover:text-blue-600 transition-colors duration-200' : ''
          }`}
          role={!disabledModal ? "button" : undefined}
          tabIndex={!disabledModal ? 0 : undefined}
          onKeyDown={!disabledModal ? (e) => e.key === 'Enter' && openModalWith() : undefined}
        >
          {truncateText(productName, 50)}
        </h2>

        {/* Product Description */}
        <div className="min-h-[3rem] mb-4">
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {truncateText(description, 100)}
          </p>
        </div>

        {!disabledModal && (
          <div className="space-y-4">
            {/* Pricing Section */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-1">
                {specialPrice && isAvailable ? (
                  <>
                    <span className="text-sm text-gray-500 line-through">
                      ${Number(price).toFixed(2)}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ${Number(specialPrice).toFixed(2)}
                      </span>
                      <span className="text-sm font-medium text-green-600">
                        {Math.round(((Number(price) - Number(specialPrice)) / Number(price)) * 100)}% off
                      </span>
                    </div>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">
                    ${Number(price).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Stock Info */}
              <div className="text-right">
                <div className="text-xs text-gray-500">
                  {isAvailable ? `${quantity} in stock` : 'Unavailable'}
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              disabled={!isAvailable || btnLoader}
              onClick={() => addToCartHandler({
                productId,
                productName,
                image,
                description,
                quantity,
                price,
                discount,
                specialPrice
              })}
              className={`w-full relative overflow-hidden rounded-xl py-3 px-4 font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isAvailable && !btnLoader
                  ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-lg hover:shadow-xl active:scale-[0.98] group'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              aria-label={isAvailable ? `Add ${productName} to cart` : `${productName} is out of stock`}
            >
              <span className="flex items-center justify-center space-x-2">
                <FaShoppingCart className={`transition-transform duration-300 ${
                  isAvailable && !btnLoader ? 'group-hover:scale-110' : ''
                }`} />
                <span>{btnLoader ? 'Adding...' : isAvailable ? 'Add to Cart' : 'Out of Stock'}</span>
              </span>
              
              {/* Button hover effect */}
              {isAvailable && !btnLoader && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left -z-10" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Enhanced Modal Component */}
      <ProductViewModal
        open={openProductViewModal}
        setOpen={setOpenProductViewModal}
        product={selectedViewProduct}
        isAvailable={isAvailable}
      />
    </div>
  );
};

export default ProductCard;