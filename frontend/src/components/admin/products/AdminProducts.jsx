import React, { useState } from 'react'
import { MdAddShoppingCart, MdInventory2 } from 'react-icons/md';
import { FaBoxOpen, FaChartLine, FaFilter } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../shared/Loader';
import { DataGrid } from '@mui/x-data-grid';
import { adminProductTableColumn } from '../../helper/tableColumn';
import useDashboardProductFilter from '../../../hooks/useDashboardProductFilter';
import Modal from '../../shared/Modal';
import AddProductForm from './AddProductForm';
import DeleteModal from '../../shared/DeleteModal';
import { deleteProduct } from '../../../store/actions';
import toast from 'react-hot-toast';
import ImageUploadForm from './ImageUploadForm';
import ProductViewModal from '../../shared/ProductViewModal';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Skeleton, Box, Chip, Paper, Tooltip } from '@mui/material';

const AdminProducts = () => {
  const { products, pagination } = useSelector((state) => state.products);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1
  );

  const dispatch = useDispatch();
  
  const [selectedProduct, setSelectedProduct] = useState('');
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openProductViewModal, setOpenProductViewModal] = useState(false);
  const [openImageUploadModal, setOpenImageUploadModal] = useState(false);

  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

  useDashboardProductFilter();

  const tableRecords = products?.map((item) => {
    return {
      id: item.productId,
      productId: item.productId,
      productName: item.productName,
      description: item.description,
      discount: item.discount,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
      specialPrice: parseFloat(item.specialPrice),
    }
  });

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenUpdateModal(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setOpenDeleteModal(true);
  };

  const handleImageUpload = (product) => {
    setSelectedProduct(product);
    setOpenImageUploadModal(true);
  };

  const handleProductView = (product) => {
    setSelectedProduct(product);
    setOpenProductViewModal(true);
  };

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`)
  };

  const onDeleteHandler = () => {
    dispatch(deleteProduct(setLoader, selectedProduct?.productId, toast, setOpenDeleteModal, isAdmin));
  };

  const emptyProduct = !products || products?.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Header Section with Statistics */}
      <div className="bg-white shadow-sm border-b border-gray-200 mb-6 -mx-6 -mt-6 px-6 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <MdInventory2 className="text-blue-600" />
              Product Management
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your inventory and product catalog
            </p>
          </div>
          <div className="flex items-center gap-3">
            {!emptyProduct && (
              <div className="hidden sm:flex items-center gap-3">
                <Chip 
                  label={`${pagination?.totalElements || 0} Products`}
                  color="primary"
                  variant="outlined"
                  size="small"
                  icon={<FaBoxOpen />}
                />
                <Chip 
                  label={`Page ${currentPage} of ${pagination?.totalPages || 1}`}
                  variant="outlined"
                  size="small"
                />
              </div>
            )}
            <Tooltip title="Add New Product" arrow placement="bottom">
              <button
                onClick={() => setOpenAddModal(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2.5 px-4 flex items-center gap-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                aria-label="Add new product"
              >
                <MdAddShoppingCart className="text-lg" />
                <span className="hidden sm:inline">Add Product</span>
                <span className="sm:hidden">Add</span>
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton variant="rectangular" height={60} className="rounded-lg" />
          <Skeleton variant="rectangular" height={400} className="rounded-lg" />
        </div>
      ) : errorMessage ? (
        <Paper className="p-8 text-center bg-red-50 border border-red-200">
          <div className="text-red-600 mb-4">
            <FaBoxOpen size={48} className="mx-auto opacity-50" />
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Error Loading Products
          </h3>
          <p className="text-red-600">{errorMessage}</p>
        </Paper>
      ) : emptyProduct ? (
        <Paper className="p-16 text-center bg-white shadow-sm">
          <div className="max-w-md mx-auto">
            <div className="text-gray-400 mb-6">
              <FaBoxOpen size={64} className="mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No Products Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start building your catalog by adding your first product
            </p>
            <button
              onClick={() => setOpenAddModal(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 inline-flex items-center gap-2"
            >
              <MdAddShoppingCart className="text-xl" />
              Add Your First Product
            </button>
          </div>
        </Paper>
      ) : (
        <Paper className="overflow-hidden shadow-sm">
          <Box sx={{ 
            width: '100%',
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #f3f4f6',
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: '2px solid #e5e7eb',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: '#ffffff',
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: '2px solid #e5e7eb',
              backgroundColor: '#f9fafb',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: 'transparent',
              cursor: 'default',
            },
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-columnHeader:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-columnSeparator': {
              display: 'none',
            },
            '& .MuiDataGrid-menuIcon': {
              display: 'none',
            },
            '& .MuiDataGrid-sortIcon': {
              display: 'none',
            },
          }}>
            <DataGrid
              rows={tableRecords}
              columns={adminProductTableColumn(
                handleEdit,
                handleDelete,
                handleImageUpload,
                handleProductView
              )}
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
              getRowClassName={() => 'hover:bg-transparent'}
            />
          </Box>
        </Paper>
      )}

      {/* Modals */}
      <Modal
        open={openUpdateModal || openAddModal}
        setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
        title={openUpdateModal ? "Update Product" : "Add New Product"}
      >
        <AddProductForm 
          setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
          product={selectedProduct}
          update={openUpdateModal}
        />
      </Modal>

      <Modal
        open={openImageUploadModal}
        setOpen={setOpenImageUploadModal}
        title="Upload Product Image"
      >
        <ImageUploadForm 
          setOpen={setOpenImageUploadModal}
          product={selectedProduct}
        />
      </Modal>

      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        loader={loader}
        title="Delete Product"
        onDeleteHandler={onDeleteHandler}
      />

      <ProductViewModal 
        open={openProductViewModal}
        setOpen={setOpenProductViewModal}
        product={selectedProduct}
        isAvailable={true}
      />
    </div>
  );
};

export default AdminProducts;