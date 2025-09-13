import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import OrderTable from "./OrderTable";
import useOrderFilter from "../../../hooks/useOrderFilter";
import ErrorPage from "../../shared/ErrorPage";

import { Skeleton, Paper, Chip } from "@mui/material";

const Orders = () => {
  const { adminOrder, pagination } = useSelector((state) => state.order);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  // רענון לפי פרמטרים ב־URL (כמו Sellers)
  useOrderFilter();

  const emptyOrder = !adminOrder || adminOrder.length === 0;

  // עבור רענון מהיר לאחר עדכון סטטוס (אם תרצה בעתיד להעביר onUpdated מטופס)
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const params = new URLSearchParams(searchParams);
  const handleRefresh = () => {
    params.set("t", Date.now().toString());
    navigate(`${pathname}?${params}`, { replace: true });
  };

  if (errorMessage) return <ErrorPage message={errorMessage} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 -mx-6 -mt-6 px-6 pt-6 pb-6">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 mb-6 -mx-6 px-6 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <FaShoppingCart className="text-blue-600" />
              Orders Management
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Track and update customer orders in real time
            </p>
          </div>

          {!emptyOrder && (
            <div className="flex items-center gap-3">
              <Chip
                label={`${pagination?.totalElements || 0} Orders`}
                color="primary"
                variant="outlined"
                size="small"
              />
              <Chip
                label={`Page ${(pagination?.pageNumber ?? 0) + 1} of ${pagination?.totalPages || 1}`}
                variant="outlined"
                size="small"
              />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton variant="rectangular" height={60} className="rounded-lg" />
          <Skeleton variant="rectangular" height={420} className="rounded-lg" />
        </div>
      ) : emptyOrder ? (
        <Paper className="p-16 text-center bg-white shadow-sm">
          <div className="max-w-md mx-auto">
            <div className="text-gray-400 mb-6">
              <FaShoppingCart size={64} className="mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Orders Yet</h2>
            <p className="text-gray-600">Orders will appear here as soon as customers purchase.</p>
          </div>
        </Paper>
      ) : (
        <OrderTable adminOrder={adminOrder} pagination={pagination} onRefresh={handleRefresh} />
      )}
    </div>
  );
};

export default Orders;
