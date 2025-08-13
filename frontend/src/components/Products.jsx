import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { useEffect } from "react";
import { fetchProducts } from "../store/actions";

const Products = () => {
    
    const isLoading = false;
    const errorMessage = "";
    const {products} = useSelector((state) => state.products); 
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch]);

    console.log(products);

    // const products = [
    // {
    //     productId: 652,
    //     productName: "Iphone Xs max",
    //     image: "https://placehold.co/600x400",
    //     description: "Experience the latest in mobile technology with advanced cameras, powerful processing, and an all-day battery.",
    //     quantity: 1,
    //     price: 1450.0,
    //     discount: 10.0,
    //     specialPrice: 1305.0,
    //     },
    //     {
    //     productId: 654,
    //     productName: "MacBook Air M2s",
    //     image: "https://placehold.co/600x400",
    //     description: "Ultra-thin laptop with Apple's M2 chip, providing fast performance in a lightweight, portable design.",
    //     quantity: 0,
    //     price: 2550.0,
    //     discount: 20.0,
    //     specialPrice: 2040.0,
    //     }
    // ]
    
    return (
        <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
            {isLoading ? (<p>Loading...</p>) : (errorMessage ? (<p>{errorMessage}</p>) : (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products && products.map((product, index) => (
                            <ProductCard key={index} {...product} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Products;