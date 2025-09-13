import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MdPersonAdd } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import SellerTable from "./SellerTable";
import ErrorPage from "../../shared/ErrorPage";
import Modal from "../../shared/Modal";
import AddSellerForm from "./AddSellerForm";
import useSellerFilter from "./useSellerFilter";

import { Skeleton, Paper, Chip, Tooltip } from "@mui/material";

const Sellers = () => {
  const [openModal, setOpenModal] = useState(false);
  const { sellers, pagination } = useSelector((state) => state.seller);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  // רענון לפי פרמטרים ב־URL
  useSellerFilter();

  const emptySellers = !sellers || sellers?.length === 0;

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const params = new URLSearchParams(searchParams);

  const handleSaved = () => {
    // שינוי מינורי ב־URL כדי להפעיל fetch מחדש מיידית
    params.set("t", Date.now().toString());
    navigate(`${pathname}?${params}`, { replace: true });
  };

  if (errorMessage) return <ErrorPage message={errorMessage} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 mb-6 -mx-6 -mt-6 px-6 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <FaUsers className="text-blue-600" />
              Seller Management
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage marketplace sellers and permissions
            </p>
          </div>

          <div className="flex items-center gap-3">
            {!emptySellers && (
              <div className="hidden sm:flex items-center gap-3">
                <Chip
                  label={`${pagination?.totalElements || 0} Sellers`}
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

            <Tooltip title="Add New Seller" arrow placement="bottom">
              <button
                onClick={() => setOpenModal(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2.5 px-4 flex items-center gap-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                aria-label="Add new seller"
              >
                <MdPersonAdd className="text-lg" />
                <span className="hidden sm:inline">Add Seller</span>
                <span className="sm:hidden">Add</span>
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton variant="rectangular" height={60} className="rounded-lg" />
          <Skeleton variant="rectangular" height={400} className="rounded-lg" />
        </div>
      ) : emptySellers ? (
        <Paper className="p-16 text-center bg-white shadow-sm">
          <div className="max-w-md mx-auto">
            <div className="text-gray-400 mb-6">
              <FaUsers size={64} className="mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Sellers Yet</h2>
            <p className="text-gray-600 mb-6">Add your first seller to get started</p>
            <button
              onClick={() => setOpenModal(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 inline-flex items-center gap-2"
            >
              <MdPersonAdd className="text-xl" />
              Add Your First Seller
            </button>
          </div>
        </Paper>
      ) : (
        <SellerTable sellers={sellers} pagination={pagination} />
      )}

      {/* Modal */}
      <Modal open={openModal} setOpen={setOpenModal} title="Add New Seller">
        <AddSellerForm setOpen={setOpenModal} onSaved={handleSaved} />
      </Modal>
    </div>
  );
};

export default Sellers;
