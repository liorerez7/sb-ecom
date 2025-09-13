import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { FaFolderOpen, FaThList, FaBoxOpen } from "react-icons/fa";
import toast from "react-hot-toast";

import Modal from "../../shared/Modal";
import AddCategoryForm from "./AddCategoryForm";
import Loader from "../../shared/Loader";
import { DeleteModal } from "../../shared/DeleteModal";
import useCategoryFilter from "../../../hooks/useCategoryFilter";
import ErrorPage from "../../shared/ErrorPage";
import { deleteCategoryDashboardAction } from "../../../store/actions";
import { categoryTableColumns } from "../../helper/tableColumn";

import { Skeleton, Box, Chip, Paper, Tooltip } from "@mui/material";

const Category = () => {
  const [searchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const params = new URLSearchParams(searchParams);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { categoryLoader, errorMessage } = useSelector((state) => state.errors);
  const { categories, pagination } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1
  );

  // טוען קטגוריות לפי פרמטרים ב־URL (כולל הפרמטר שנוסיף אחרי שמירה)
  useCategoryFilter();

  const tableRecords = categories?.map((item) => ({
    id: item.categoryId,
    categoryName: item.categoryName,
    version: item.version,
  }));

  const handleEdit = (category) => {
    setOpenUpdateModal(true);
    setSelectedCategory(category);
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setOpenDeleteModal(true);
  };

  const onDeleteHandler = () => {
    dispatch(
      deleteCategoryDashboardAction(setOpenDeleteModal, selectedCategory?.id, toast)
    );
  };

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1; // 1-based
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`);
  };

  const handleSaved = () => {
    // טריגר רענון מיידי ל־useCategoryFilter על ידי שינוי קל ב־URL
    params.set("t", Date.now().toString());
    // נשארים על אותה דף ופרמ׳, רק מוסיפים t כדי לגרום ל־hook למשוך שוב
    navigate(`${pathname}?${params}`, { replace: true });
  };

  const emptyCategories = !categories || categories?.length === 0;

  if (errorMessage) return <ErrorPage message={errorMessage} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 mb-6 -mx-6 -mt-6 px-6 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <FaThList className="text-blue-600" />
              Category Management
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your product categories
            </p>
          </div>

          <div className="flex items-center gap-3">
            {!emptyCategories && (
              <div className="hidden sm:flex items-center gap-3">
                <Chip
                  label={`${pagination?.totalElements || 0} Categories`}
                  color="primary"
                  variant="outlined"
                  size="small"
                  icon={<FaFolderOpen />}
                />
                <Chip
                  label={`Page ${currentPage} of ${pagination?.totalPages || 1}`}
                  variant="outlined"
                  size="small"
                />
              </div>
            )}

            <Tooltip title="Add New Category" arrow placement="bottom">
              <button
                onClick={() => setOpenModal(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2.5 px-4 flex items-center gap-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                aria-label="Add new category"
              >
                <FaThList className="text-lg" />
                <span className="hidden sm:inline">Add Category</span>
                <span className="sm:hidden">Add</span>
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Content */}
      {categoryLoader ? (
        <div className="space-y-4">
          <Skeleton variant="rectangular" height={60} className="rounded-lg" />
          <Skeleton variant="rectangular" height={400} className="rounded-lg" />
        </div>
      ) : emptyCategories ? (
        <Paper className="p-16 text-center bg-white shadow-sm">
          <div className="max-w-md mx-auto">
            <div className="text-gray-400 mb-6">
              <FaBoxOpen size={64} className="mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No Categories Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start organizing your catalog by adding your first category
            </p>
            <button
              onClick={() => setOpenModal(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 inline-flex items-center gap-2"
            >
              <FaThList className="text-xl" />
              Add Your First Category
            </button>
          </div>
        </Paper>
      ) : (
        <Paper className="overflow-hidden shadow-sm">
          <Box
            sx={{
              width: "100%",
              "& .MuiDataGrid-root": { border: "none" },
              "& .MuiDataGrid-cell": { borderBottom: "1px solid #f3f4f6" },
              "& .MuiDataGrid-columnHeaders": { borderBottom: "2px solid #e5e7eb" },
              "& .MuiDataGrid-virtualScroller": { backgroundColor: "#ffffff" },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "2px solid #e5e7eb",
                backgroundColor: "#f9fafb",
              },
              "& .MuiDataGrid-row:hover": { backgroundColor: "transparent", cursor: "default" },
              "& .MuiDataGrid-cell:focus": { outline: "none" },
              "& .MuiDataGrid-columnHeader:focus": { outline: "none" },
              "& .MuiDataGrid-columnSeparator": { display: "none" },
              "& .MuiDataGrid-menuIcon": { display: "none" },
              "& .MuiDataGrid-sortIcon": { display: "none" },
            }}
          >
            <DataGrid
              rows={tableRecords}
              columns={categoryTableColumns(handleEdit, handleDelete)}
              paginationMode="server"
              rowCount={pagination?.totalElements || 0}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: pagination?.pageSize || 10,
                    page: currentPage - 1,
                  },
                },
              }}
              onPaginationModelChange={handlePaginationChange}
              disableRowSelectionOnClick
              disableColumnResize
              disableColumnMenu
              pageSizeOptions={[pagination?.pageSize || 10]}
              pagination
              autoHeight
              getRowClassName={() => "hover:bg-transparent"}
            />
          </Box>
        </Paper>
      )}

      {/* Modals */}
      <Modal
        open={openUpdateModal || openModal}
        setOpen={openUpdateModal ? setOpenUpdateModal : setOpenModal}
        title={openUpdateModal ? "Update Category" : "Add Category"}
      >
        <AddCategoryForm
          setOpen={openUpdateModal ? setOpenUpdateModal : setOpenModal}
          open={categoryLoader}
          category={selectedCategory}
          update={openUpdateModal}
          onSaved={handleSaved}   // <-- חשוב: רענון מיידי אחרי שמירה
        />
      </Modal>

      <DeleteModal
        open={openDeleteModal}
        loader={categoryLoader}
        setOpen={setOpenDeleteModal}
        title="Are you want to delete this category"
        onDeleteHandler={onDeleteHandler}
      />
    </div>
  );
};

export default Category;
