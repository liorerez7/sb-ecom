// import { useEffect } from "react";
// import HeroBanner from "./HeroBanner"
// import { useSelector, useDispatch } from "react-redux";
// import ProductCard from "../shared/ProductCard";
// import { fetchProducts } from "../../store/actions";
// import Loader from "../shared/Loader";


// const Home = () => {

// const dispatch = useDispatch();
// const {products} = useSelector((state) => state.products);
// const {isLoading, errorMessage} = useSelector((state) => state.errors);


// useEffect(() => {
//     dispatch(fetchProducts());
// }, [dispatch]);


//     //displaying only top rated items (just for demo purposes)
//     return (
//         <div>
//             <HeroBanner />
//             <h2 className="text-2xl font-bold my-6">Top Rated Products</h2>
//             {isLoading ? (<Loader />) : errorMessage ? (<p>{errorMessage}</p>) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {products && 
//                     products?.slice(0, 3).map((product, index) => (
//                         <ProductCard key={index} {...product} />
//                     ))}
//                 </div>
//             )}
//         </div>
//     )
// }

// export default Home

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
    <main className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <section className="relative bg-white">
        <HeroBanner />
      </section>

      {/* Featured Products Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl mb-6">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Top Rated Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover our most loved products, handpicked by customers who trust quality and excellence
            </p>
            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mx-auto"></div>
          </div>

          {/* Content Area */}
          <div className="relative">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader />
                <p className="text-gray-500 mt-4 text-sm font-medium">Loading amazing products...</p>
              </div>
            ) : errorMessage ? (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-md mx-auto">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
                <p className="text-red-600 text-sm mb-4">{errorMessage}</p>
                <button 
                  onClick={() => dispatch(fetchProducts())}
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {products && 
                products?.slice(0, 3).map((product, index) => (
                  <div 
                    key={index} 
                    className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                    style={{ 
                      animationDelay: `${index * 150}ms`,
                      animation: 'fadeInUp 0.6s ease-out forwards'
                    }}
                  >
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>
            )}

            {/* Call to Action */}
            {!isLoading && !errorMessage && products && products.length > 0 && (
              <div className="text-center mt-16">
                <a
                  href="/products"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-300 group"
                >
                  View All Products
                  <svg className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}

export default Home