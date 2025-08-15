import { useEffect } from "react";
import HeroBanner from "./HeroBanner"
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../shared/ProductCard";
import { fetchProducts } from "../../store/actions";
import Loader from "../shared/Loader";


const Home = () => {

const dispatch = useDispatch();
const {products} = useSelector((state) => state.products);
const {isLoading, errorMessage} = useSelector((state) => state.errors);


useEffect(() => {
    dispatch(fetchProducts());
}, [dispatch]);


    //displaying only top rated items (just for demo purposes)
    return (
        <div>
            <HeroBanner />
            {isLoading ? (<Loader />) : errorMessage ? (<p>{errorMessage}</p>) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products && 
                    products?.slice(0, 3).map((product, index) => (
                        <ProductCard key={index} {...product} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Home