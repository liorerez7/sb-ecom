import { FaEdit, FaEye, FaImage, FaTrashAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

export const adminProductTableColumn = (
  handleEdit,
  handleDelete,
  handleImageUpload,
  handleProductView
) => [
  {
    disableColumnMenu: true,
    sortable: false,
    field: "id",
    headerName: "ID",
    minWidth: 200,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 font-semibold border-b-2 border-gray-200",
    cellClassName: "text-gray-700 font-medium",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Product ID</span>
      </div>
    ),
    renderCell: (params) => (
      <div className="flex items-center justify-center">
        <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-700">
          #{params.value}
        </span>
      </div>
    ),
  },
  {
    disableColumnMenu: true,
    sortable: false,
    field: "productName",
    headerName: "Product Name",
    align: "center",
    width: 260,
    editable: false,
    headerAlign: "center",
    headerClassName: "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 font-semibold border-b-2 border-gray-200",
    cellClassName: "text-gray-700",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Product Name</span>
      </div>
    ),
    renderCell: (params) => (
      <div className="flex items-center justify-center px-2">
        <span className="text-sm font-medium text-gray-800 truncate max-w-[240px]" title={params.value}>
          {params.value}
        </span>
      </div>
    ),
  },
  {
    disableColumnMenu: true,
    sortable: false,
    field: "price",
    headerName: "Price",
    minWidth: 150,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 font-semibold border-b-2 border-gray-200",
    cellClassName: "text-gray-700",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Price</span>
      </div>
    ),
    renderCell: (params) => (
      <div className="flex items-center justify-center">
        <span className="text-sm font-semibold text-emerald-600">
          ${params.value?.toFixed(2) || '0.00'}
        </span>
      </div>
    ),
  },
  {
    disableColumnMenu: true,
    sortable: false,
    field: "quantity",
    headerName: "Quantity",
    minWidth: 150,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 font-semibold border-b-2 border-gray-200",
    cellClassName: "text-gray-700",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Quantity</span>
      </div>
    ),
    renderCell: (params) => {
      const qty = params.value || 0;
      const getStockStatus = () => {
        if (qty > 10) return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' };
        if (qty > 0) return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
        return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
      };
      const status = getStockStatus();
      
      return (
        <div className="flex items-center justify-center">
          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.text} border ${status.border}`}>
            {qty}
          </div>
        </div>
      );
    },
  },
  {
    disableColumnMenu: true,
    sortable: false,
    field: "specialPrice",
    headerName: "Special Price",
    minWidth: 150,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 font-semibold border-b-2 border-gray-200",
    cellClassName: "text-gray-700",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Special Price</span>
      </div>
    ),
    renderCell: (params) => (
      <div className="flex items-center justify-center">
        {params.value ? (
          <span className="text-sm font-semibold text-rose-600">
            ${params.value?.toFixed(2)}
          </span>
        ) : (
          <span className="text-xs text-gray-400">—</span>
        )}
      </div>
    ),
  },
  {
    sortable: false,
    disableColumnMenu: true,
    field: "description",
    headerName: "Description",
    headerAlign: "center",
    align: "center",
    width: 200,
    editable: false,
    headerClassName: "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 font-semibold border-b-2 border-gray-200",
    cellClassName: "text-gray-700",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Description</span>
      </div>
    ),
    renderCell: (params) => (
      <div className="flex items-center justify-center px-2">
        <span className="text-xs text-gray-600 truncate max-w-[180px]" title={params.value}>
          {params.value || '—'}
        </span>
      </div>
    ),
  },
  {
    sortable: false,
    disableColumnMenu: true,
    field: "image",
    headerName: "Image",
    headerAlign: "center",
    align: "center",
    width: 100,
    editable: false,
    headerClassName: "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 font-semibold border-b-2 border-gray-200",
    cellClassName: "text-gray-700",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Image</span>
      </div>
    ),
    renderCell: (params) => (
      <div className="flex items-center justify-center">
        {params.value ? (
          <div className="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center">
            <FaImage className="text-emerald-600 text-xs" />
          </div>
        ) : (
          <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center">
            <FaImage className="text-gray-400 text-xs" />
          </div>
        )}
      </div>
    ),
  },
  {
    field: "action",
    headerName: "Actions",
    headerAlign: "center",
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    headerClassName: "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 font-semibold border-b-2 border-gray-200",
    cellClassName: "text-gray-700",
    width: 400,
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Actions</span>
      </div>
    ),
    renderCell: (params) => {
      return (
        <div className="flex justify-center items-center gap-2 h-full py-2 px-2">
          <button
            onClick={() => handleImageUpload(params.row)}
            className="group flex items-center bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-3 py-1.5 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 text-xs font-medium transform hover:scale-105"
            aria-label={`Upload image for ${params.row.productName}`}
          >
            <FaImage className="mr-1.5 text-xs group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Image</span>
          </button>
          <button
            onClick={() => handleEdit(params.row)}
            className="group flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-1.5 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 text-xs font-medium transform hover:scale-105"
            aria-label={`Edit ${params.row.productName}`}
          >
            <FaEdit className="mr-1.5 text-xs group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button
            onClick={() => handleDelete(params.row)}
            className="group flex items-center bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-1.5 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 text-xs font-medium transform hover:scale-105"
            aria-label={`Delete ${params.row.productName}`}
          >
            <FaTrashAlt className="mr-1.5 text-xs group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Delete</span>
          </button>
          <button
            onClick={() => handleProductView(params.row)}
            className="group flex items-center bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-3 py-1.5 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 text-xs font-medium transform hover:scale-105"
            aria-label={`View ${params.row.productName}`}
          >
            <FaEye className="mr-1.5 text-xs group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">View</span>
          </button>
        </div>
      );
    },
  },
];

export const adminOrderTableColumn = (handleEdit) => [
  { 
    sortable: false,
    disableColumnMenu: true,
    field: "id",
    headerName: "Order ID",
    minWidth: 180,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 font-semibold border-b-2 border-gray-200",
    cellClassName: "text-gray-700",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Order ID</span>
      </div>
    ),
    renderCell: (params) => (
      <div className="flex items-center justify-center">
        <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-700">
          #{params.value}
        </span>
      </div>
    ),
  },
  {
    disableColumnMenu: true,
    sortable: false,
    field: "email",
    headerName: "Customer Email",
    align: "center",
    width: 250,
    editable: false,
    headerAlign: "center",
    headerClassName: "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 font-semibold border-b-2 border-gray-200",
    cellClassName: "text-gray-700",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Customer Email</span>
      </div>
    ),
    renderCell: (params) => (
      <div className="flex items-center justify-center gap-2 px-2">
        <MdOutlineEmail className="text-blue-500 text-sm flex-shrink-0" />
        <span className="text-xs text-gray-700 truncate max-w-[180px]" title={params.value}>
          {params.value}
        </span>
      </div>
    ),
  },
  {
    disableColumnMenu: true,
    sortable: false,
    field: "totalAmount",
    headerName: "Total Amount",
    align: "center",
    width: 180,
    editable: false,
    headerAlign: "center",
    headerClassName: "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 font-semibold border-b-2 border-gray-200",
    cellClassName: "text-gray-700",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Total Amount</span>
      </div>
    ),
    renderCell: (params) => (
      <div className="flex items-center justify-center">
        <span className="text-sm font-semibold text-emerald-600">
          ${params.value?.toFixed(2) || '0.00'}
        </span>
      </div>
    ),
  },
  {
    disableColumnMenu: true,
    sortable: false,
    field: "status",
    headerName: "Order Status",
    align: "center",
    width: 180,
    editable: false,
    headerAlign: "center",
    headerClassName: "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 font-semibold border-b-2 border-gray-200",
    cellClassName: "text-gray-700",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Order Status</span>
      </div>
    ),
    renderCell: (params) => {
      const getStatusStyle = (status) => {
        const statusLower = status?.toLowerCase() || '';
        if (statusLower.includes('delivered')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
        if (statusLower.includes('shipped')) return 'bg-blue-50 text-blue-700 border-blue-200';
        if (statusLower.includes('processing')) return 'bg-amber-50 text-amber-700 border-amber-200';
        if (statusLower.includes('cancelled')) return 'bg-red-50 text-red-700 border-red-200';
        if (statusLower.includes('pending')) return 'bg-orange-50 text-orange-700 border-orange-200';
        return 'bg-gray-50 text-gray-700 border-gray-200';
      };

      return (
        <div className="flex items-center justify-center">
          <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(params.value)}`}>
            {params.value || 'Unknown'}
          </div>
        </div>
      );
    },
  },
  {
    disableColumnMenu: true,
    sortable: false,
    field: "date",
    headerName: "Order Date",
    align: "center",
    width: 180,
    editable: false,
    headerAlign: "center",
    headerClassName: "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 font-semibold border-b-2 border-gray-200",
    cellClassName: "text-gray-700",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Order Date</span>
      </div>
    ),
    renderCell: (params) => (
      <div className="flex items-center justify-center">
        <span className="text-xs text-gray-600">
          {params.value ? new Date(params.value).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          }) : '—'}
        </span>
      </div>
    ),
  },
  {
    field: "action",
    headerName: "Actions",
    headerAlign: "center",
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    headerClassName: "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 font-semibold border-b-2 border-gray-200",
    cellClassName: "text-gray-700",
    width: 200,
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Actions</span>
      </div>
    ),
    renderCell: (params) => {
      return (
        <div className='flex justify-center items-center h-full py-2'>
          <button
            onClick={() => handleEdit(params.row)}
            className='group flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-1.5 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 text-xs font-medium transform hover:scale-105'
            aria-label={`Edit order #${params.row.id}`}
          >
            <FaEdit className='mr-2 text-xs group-hover:rotate-12 transition-transform'/>
            <span className="hidden sm:inline">Edit Status</span>
            <span className="sm:hidden">Edit</span>
          </button>
        </div>
      );
    },
  },
];

export const categoryTableColumns = (handleEdit, handleDelete) => [
  {
    sortable: false,
    disableColumnMenu: true,
    field: "id",
    headerName: "Category ID",
    minWidth: 300,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 font-semibold border-b-2 border-gray-200",
    cellClassName: "text-gray-700",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Category ID</span>
      </div>
    ),
    renderCell: (params) => (
      <div className="flex items-center justify-center">
        <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-700">
          #{params.value}
        </span>
      </div>
    ),
  },
  {
    disableColumnMenu: true,
    sortable: false,
    field: "categoryName",
    headerName: "Category Name",
    align: "center",
    width: 400,
    editable: false,
    headerAlign: "center",
    headerClassName: "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 font-semibold border-b-2 border-gray-200",
    cellClassName: "text-gray-700",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Category Name</span>
      </div>
    ),
    renderCell: (params) => (
      <div className="flex items-center justify-center px-2">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 px-4 py-1.5 rounded-lg border border-purple-200 font-medium text-sm">
          {params.value || 'Unnamed Category'}
        </div>
      </div>
    ),
  },
  {
    field: "action",
    headerName: "Actions",
    headerAlign: "center",
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    headerClassName: "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 font-semibold border-b-2 border-gray-200",
    cellClassName: "text-gray-700",
    width: 400,
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Actions</span>
      </div>
    ),
    renderCell: (params) => {
      return (
        <div className="flex justify-center gap-2 h-full py-2">
          <button
            onClick={() => handleEdit(params.row)}
            className="group flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-1.5 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 text-xs font-medium transform hover:scale-105"
            aria-label={`Edit category ${params.row.categoryName}`}
          >
            <FaEdit className="mr-2 text-xs group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button
            onClick={() => handleDelete(params.row)}
            className="group flex items-center bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-1.5 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 text-xs font-medium transform hover:scale-105"
            aria-label={`Delete category ${params.row.categoryName}`}
          >
            <FaTrashAlt className="mr-2 text-xs group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      );
    },
  },
];

export const sellerTableColumns = [
  {
    disableColumnMenu: true,
    sortable: false,
    field: "id",
    headerName: "Seller ID",
    minWidth: 400,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 font-semibold border-b-2 border-gray-200",
    cellClassName: "text-gray-700",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Seller ID</span>
      </div>
    ),
    renderCell: (params) => (
      <div className="flex items-center justify-center">
        <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-700">
          #{params.value}
        </span>
      </div>
    ),
  },
  {
    disableColumnMenu: true,
    sortable: false,
    field: "username",
    headerName: "Username",
    minWidth: 400,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 font-semibold border-b-2 border-gray-200",
    cellClassName: "text-gray-700",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Username</span>
      </div>
    ),
    renderCell: (params) => (
      <div className="flex items-center justify-center px-2">
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 px-4 py-1.5 rounded-lg border border-indigo-200 font-medium text-sm">
          @{params.value || 'unknown'}
        </div>
      </div>
    ),
  },
  {
    disableColumnMenu: true,
    sortable: false,
    field: "email",
    headerName: "Email Address",
    align: "center",
    width: 400,
    editable: false,
    headerAlign: "center",
    headerClassName: "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 font-semibold border-b-2 border-gray-200",
    cellClassName: "text-gray-700",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Email Address</span>
      </div>
    ),
    renderCell: (params) => {
      return (
        <div className="flex items-center justify-center gap-2 px-2">
          <MdOutlineEmail className="text-blue-500 text-sm flex-shrink-0" />
          <span className="text-xs text-gray-700 truncate max-w-[250px]" title={params?.row?.email}>
            {params?.row?.email || 'No email provided'}
          </span>
        </div>
      );
    },
  },
];