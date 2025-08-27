import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({ publicPage = false, adminOnly = false }) => {
    const { user } = useSelector((state) => state.auth);
    const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");
    const isSeller = user && user?.roles?.includes("ROLE_SELLER");
    const location = useLocation();

    // דפים ציבוריים: אם יש משתמש → להפנות לבית; אחרת לאפשר כניסה
    if (publicPage) {
        return user ? <Navigate to="/" /> : <Outlet />;
    }

    // אזור אדמין/מוכר
    if (adminOnly) {
        // מוכר ללא אדמין – לאפשר רק נתיבי Seller המוגדרים
        if (isSeller && !isAdmin) {
            const sellerAllowedPaths = ["/admin/orders", "/admin/products"];
            const sellerAllowed = sellerAllowedPaths.some((path) =>
                location.pathname.startsWith(path)
            );
            if (!sellerAllowed) {
                return <Navigate to="/" replace />;
            }
        }
    }

    // אם לא אדמין ולא מוכר – חסימה (כפי שהמרצה מגדיר)
    if (!isAdmin && !isSeller) {
        return <Navigate to="/" />;
    }

    // ברירת מחדל: אם יש משתמש → לאפשר, אחרת להפנות ללוגין
    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
