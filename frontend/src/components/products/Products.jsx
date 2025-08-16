import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../shared/ProductCard";
import { useEffect } from "react";
import { fetchCategories } from "../../store/actions";
import useProductFilter from "../../hooks/useProductFilter";
import Filter from "./Filter";
import Loader from "../shared/Loader";
import Paginations from "../shared/Paginations";

const Products = () => {
    const {products, categories, pagination} = useSelector((state) => state.products); 
    const {isLoading, errorMessage} = useSelector((state) => state.errors);

    useProductFilter();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    console.log(products);


    return (
    <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
        <Filter categories={categories ? categories : []} />

        {isLoading ? (<Loader />) : errorMessage ? (<p>{errorMessage}</p>) : (
        <>
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products && products.map((product, index) => (
                    <ProductCard key={product.productId} {...product} />
                ))}
                </div>
            </div>
            <Paginations 
                        numberOfPage={pagination?.totalPages}
                        totalProducts={pagination?.totalElements} />
        </>
        )}
    </div>
    );
}
export default Products;