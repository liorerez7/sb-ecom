// src/components/ProductCard.jsx
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import { useDispatch } from "react-redux";

const ProductCard = ({
  productId,
  productName,
  image,
  description,
  quantity,
  price,
  discount,
  specialPrice,
  about = false,
}) => {
  const [openProductViewModal, setOpenProductViewModal] = useState(false);
  const [selectedViewProduct, setSelectedViewProduct] = useState(null);
  const btnLoader = false;
  const isAvailable = quantity && Number(quantity) > 0;
  const dispatch = useDispatch();

  const openModalWith = () => {
    if (about) return;
    setSelectedViewProduct({
      id: productId,
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

  const addToCartHandler = () => {};

  return (
    <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
      <div onClick={openModalWith} className="w-full overflow-hidden aspect-[3/2]">
        <img
          className="w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105"
          src={image}
          alt={productName}
        />
      </div>

      <div className="p-4">
        <h2 onClick={openModalWith} className="text-lg font-semibold mb-2 cursor-pointer">
          {productName}
        </h2>

        <div className="min-h-20 max-h-20">
          <p className="text-gray-600 text-sm">{description}</p>
        </div>

        {!about && (
          <div className="mt-3 flex items-center justify-between">
            {specialPrice && isAvailable ? (
              <div className="flex flex-col">
                <span className="text-gray-400 line-through">${Number(price).toFixed(2)}</span>
                <span className="text-xl font-bold text-slate-700">
                  ${Number(specialPrice).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold text-slate-700">
                ${Number(price).toFixed(2)}
              </span>
            )}

            <button
              disabled={!isAvailable || btnLoader}
              onClick={addToCartHandler}
              className={`bg-blue-500 ${
                isAvailable ? "opacity-100 hover:bg-blue-600" : "opacity-70"
              } text-white py-2 px-3 rounded-lg items-center transition-colors duration-300 w-36 flex justify-center`}
            >
              <FaShoppingCart className="mr-2" />
              {isAvailable ? "Add to Cart" : "Stock Out"}
            </button>
          </div>
        )}
      </div>

      {/* Modal is wired exactly as ProductViewModal expects */}
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
