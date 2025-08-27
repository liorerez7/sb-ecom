import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProducts, dashboardProductsAction } from "../store/actions";

/**
 * מוצרים לעמוד הראשי / ציבורי
 * בונה queryString לפי פרמטרים מה-URL ושולח fetchProducts
 */
const useProductFilter = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams();

        const currentPage = searchParams.get("page")
            ? Number(searchParams.get("page"))
            : 1;

        params.set("pageNumber", String(currentPage - 1));

        const sortOrder = searchParams.get("sortby") || "asc";
        const categoryParams = searchParams.get("category") || null;
        const keyword = searchParams.get("keyword") || null;

        params.set("sortBy", "price");
        params.set("sortOrder", sortOrder);

        if (categoryParams) {
            params.set("category", categoryParams);
        }
        if (keyword) {
            params.set("keyword", keyword);
        }

        const queryString = params.toString();
        // console.log("QUERY STRING", queryString);

        dispatch(fetchProducts(queryString));
    }, [dispatch, searchParams]);
};

/**
 * מוצרים לדאשבורד (Admin/Seller)
 * משתמש ב-role מה-Redux כדי להחליט איזה endpoint לקרוא דרך dashboardProductsAction
 */
export const useDashboardProductFilter = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const isAdmin =
        !!user && Array.isArray(user.roles) && user.roles.includes("ROLE_ADMIN");

    useEffect(() => {
        const params = new URLSearchParams();

        const currentPage = searchParams.get("page")
            ? Number(searchParams.get("page"))
            : 1;

        params.set("pageNumber", String(currentPage - 1));

        const queryString = params.toString();
        dispatch(dashboardProductsAction(queryString, isAdmin));
    }, [dispatch, searchParams, isAdmin]);
};

export default useProductFilter;
