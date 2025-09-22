import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../shared/ProductCard";
import { useEffect } from "react";
import { fetchCategories } from "../../store/actions";
import useProductFilter from "../../hooks/useProductFilter";
import Filter from "./Filter";
import Loader from "../shared/Loader";
import Paginations from "../shared/Paginations";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const Products = () => {
  const { products, categories, pagination } = useSelector((state) => state.products);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  useProductFilter();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto" dir="auto">
      {/* Filter header */}
      <Box sx={{ mb: 3 }}>
        <Filter categories={categories ? categories : []} />
      </Box>

      {/* Loading / Error / Content */}
      {isLoading ? (
        <Loader />
      ) : errorMessage ? (
        <Box sx={{ mb: 2 }} aria-live="assertive">
          <Alert severity="error" variant="filled" role="alert">
            {errorMessage}
          </Alert>
        </Box>
      ) : (
        <>
          <Box component="section" aria-label="Products list" sx={{ mt: 1 }}>
            {products && products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.productId} data-testid="product-card">
                  <ProductCard key={product.productId} {...product} />
                  </div>
                ))}
              </div>
            ) : (
              // Empty state (design-only, non-breaking)
              <Box
                sx={{
                  p: { xs: 3, sm: 4 },
                  borderRadius: 2,
                  border: "1px dashed",
                  borderColor: "divider",
                  textAlign: "center",
                  bgcolor: "background.paper",
                }}
                role="status"
                aria-live="polite"
              >
                <Typography variant="h6" sx={{ mb: 1 }}>
                  No products found
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                  Try adjusting filters or clearing search to see more results.
                </Typography>
                <Divider sx={{ my: 1 }} />
              </Box>
            )}
          </Box>

          {/* Pagination */}
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Paginations
              numberOfPage={pagination?.totalPages}
              totalProducts={pagination?.totalElements}
            />
          </Box>
        </>
      )}
    </div>
  );
};

export default Products;
