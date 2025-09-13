// import { FaEdit, FaEye, FaImage, FaTrashAlt } from "react-icons/fa";
// import { MdOutlineEmail } from "react-icons/md";


// export const adminProductTableColumn = (
//   handleEdit,
//   handleDelete,
//   handleImageUpload,
//   handleProductView
// ) => [
//   {
//     disableColumnMenu: true,
//     sortable: false,
//     field: "id",
//     headerName: "ID",
//     minWidth: 200,
//     headerAlign: "center",
//     align: "center",
//     editable: false,
//     headerClassName: "text-black font-semibold border",
//     cellClassName: "text-slate-700 font-normal border",
//     renderHeader: (params) => <span className="text-center">ProductID</span>,
//   },
//   {
//     disableColumnMenu: true,
//     field: "productName",
//     headerName: "Product Name",
//     align: "center",
//     width: 260,
//     editable: false,
//     sortable: false,
//     headerAlign: "center",
//     headerClassName: "text-black font-semibold text-center border ",
//     cellClassName: "text-slate-700 font-normal border text-center",
//     renderHeader: (params) => <span>Product Name</span>,
//   },

//   {
//     disableColumnMenu: true,
//     field: "price",
//     headerName: "Price",
//     minWidth: 200,
//     headerAlign: "center",
//     align: "center",
//     editable: false,
//     headerClassName: "text-black font-semibold border",
//     cellClassName: "text-slate-700 font-normal border",
//     renderHeader: (params) => <span className="text-center">Price</span>,
//   },
//   {
//     disableColumnMenu: true,
//     field: "quantity",
//     headerName: "Quantity",
//     minWidth: 200,
//     headerAlign: "center",
//     align: "center",
//     editable: false,
//     headerClassName: "text-black font-semibold border",
//     cellClassName: "text-slate-700 font-normal border",
//     renderHeader: (params) => <span className="text-center">Quantity</span>,
//   },
//   {
//     disableColumnMenu: true,
//     field: "specialPrice",
//     headerName: "Price",
//     minWidth: 200,
//     headerAlign: "center",
//     align: "center",
//     editable: false,
//     headerClassName: "text-black font-semibold border",
//     cellClassName: "text-slate-700 font-normal border",
//     renderHeader: (params) => (
//       <span className="text-center">Special Price</span>
//     ),
//   },
//   {
//     sortable: false,
//     field: "description",
//     headerName: "Image",
//     headerAlign: "center",
//     align: "center",
//     width: 200,
//     editable: false,
//     disableColumnMenu: true,
//     headerClassName: "text-black font-semibold border ",
//     cellClassName: "text-slate-700 font-normal border",
//     renderHeader: (params) => <span className="ps-10">Description</span>,
//   },
//   {
//     sortable: false,
//     field: "image",
//     headerName: "Image",
//     headerAlign: "center",
//     align: "center",
//     width: 200,
//     editable: false,
//     disableColumnMenu: true,
//     headerClassName: "text-black font-semibold border ",
//     cellClassName: "text-slate-700 font-normal border",
//     renderHeader: (params) => <span className="ps-10">Image</span>,
//   },

//   {
//     field: "action",
//     headerName: "Action",
//     headerAlign: "center",
//     editable: false,
//     headerClassName: "text-black font-semibold text-center",
//     cellClassName: "text-slate-700 font-normal",
//     sortable: false,
//     width: 400,
//     renderHeader: (params) => <span>Action</span>,
//     renderCell: (params) => {
//       return (
//         <div className="flex justify-center items-center space-x-2 h-full pt-2">
//           <button
//             onClick={() => handleImageUpload(params.row)}
//             className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 h-9 rounded-md"
//           >
//             <FaImage className="mr-2" />
//             Image
//           </button>
//           <button
//             onClick={() => handleEdit(params.row)}
//             className="flex items-center bg-blue-500 text-white px-4 h-9 rounded-md "
//           >
//             <FaEdit className="mr-2" />
//             Edit
//           </button>

//           <button
//             onClick={() => handleDelete(params.row)}
//             className="flex items-center bg-red-500 text-white px-4   h-9 rounded-md"
//           >
//             <FaTrashAlt className="mr-2" />
//             Delete
//           </button>
//           <button
//             onClick={() => handleProductView(params.row)}
//             className="flex items-center bg-slate-800 text-white px-4   h-9 rounded-md"
//           >
//             <FaEye className="mr-2" />
//             View
//           </button>
//         </div>
//       );
//     },
//   },
// ];


// export const adminOrderTableColumn = (handleEdit) => [
//   { 
//     sortable: false,
//     disableColumnMenu: true,
//     field: "id",
//     headerName: "orderId",
//     minWidth: 180,
//     headerAlign: "center",
//     editable: false,
//     headerClassName: "text-black font-semibold border",
//     cellClassName: "text-slate-700 font-normal border",
//     renderHeader: (params) => <span className='text-center'>Order ID</span>
//    },
//   {
//     // Column for customer email.
//     disableColumnMenu: true,
//     field: "email",
//     headerName: "Email",
//     align: "center",
//     width: 250,
//     editable: false,
//     sortable: false,
//     headerAlign: "center",
//     headerClassName: "text-black font-semibold text-center border ",
//     cellClassName: "text-slate-700 font-normal border text-center",
//     renderHeader: (params) => <span>Email</span>,
//   },
//   {
//     // Column for showing total amount of the order.
//     disableColumnMenu: true,
//     field: "totalAmount",
//     headerName: "Total Amount",
//     align: "center",
//     width: 200,
//     editable: false,
//     sortable: true,
//     headerAlign: "center",
//     headerClassName: "text-black font-semibold text-center border ",
//     cellClassName: "text-slate-700 font-normal border text-center",
//     renderHeader: (params) => <span>Total Amount</span>,
//   },
//   {
//     // Column to display order status (e.g., Pending, Shipped).
//     disableColumnMenu: true,
//     field: "status",
//     headerName: "Status",
//     align: "center",
//     width: 200,
//     editable: false,
//     sortable: false,
//     headerAlign: "center",
//     headerClassName: "text-black font-semibold text-center border ",
//     cellClassName: "text-slate-700 font-normal border text-center",
//     renderHeader: (params) => <span>Status</span>,
//   },
//   {
//     // Column for order creation date.
//     disableColumnMenu: true,
//     field: "date",
//     headerName: "Order Date",
//     align: "center",
//     width: 200,
//     editable: false,
//     sortable: false,
//     headerAlign: "center",
//     headerClassName: "text-black font-semibold text-center border ",
//     cellClassName: "text-slate-700 font-normal border text-center",
//     renderHeader: (params) => <span>Order Date</span>,
//   },
//   {
//     // Custom action column with an "Edit" button.
//     field: "action",
//     headerName: "Action",
//     headerAlign: "center",
//     editable: false,
//     headerClassName: "text-black font-semibold text-center",
//     cellClassName: "text-slate-700 font-normal",
//     sortable: false,
//     width: 250,
//     renderHeader: (params) => <span>Action</span>,
//     renderCell: (params) => {
//       return (
//         <div className='flex justify-center items-center space-x-2 h-full pt-2'>
//           <button
//             onClick={() => handleEdit(params.row)}
//             className='flex items-center bg-blue-500 text-white px-4 h-9 rounded-md'>
//               <FaEdit className='mr-2'/>
//               Edit
//           </button>
//         </div>
//       );
//     },
//   },
// ];


// //table column for categories in admin panel
// export const categoryTableColumns = (handleEdit, handleDelete) => [
//   {
//     sortable: false,
//     disableColumnMenu: true,
//     field: "id",
//     headerName: "CategoryId",
//     minWidth: 300,
//     headerAlign: "center",
//     align: "center",
//     editable: false,
//     headerClassName: "text-black font-semibold border",
//     cellClassName: "text-slate-700 font-normal border",
//     renderHeader: (params) => <span className="text-center">CategoryId</span>,
//   },
//   {
//     disableColumnMenu: true,
//     field: "categoryName",
//     headerName: "Category Name",
//     align: "center",
//     width: 400,
//     editable: false,
//     sortable: false,
//     headerAlign: "center",
//     headerClassName: "text-black font-semibold text-center border ",
//     cellClassName: "text-slate-700 font-normal border text-center",
//     renderHeader: (params) => <span>Category Name</span>,
//   },

//   {
//     field: "action",
//     headerName: "Action",
//     headerAlign: "center",
//     editable: false,
//     headerClassName: "text-black font-semibold text-center",
//     cellClassName: "text-slate-700 font-normal",
//     sortable: false,
//     width: 400,
//     renderHeader: (params) => <span>Action</span>,
//     renderCell: (params) => {
//       return (
//         <div className="flex justify-center space-x-2 h-full pt-2">
//           <button
//             onClick={() => handleEdit(params.row)}
//             className="flex items-center bg-blue-500 text-white px-4 h-9 rounded-md "
//           >
//             <FaEdit className="mr-2" />
//             Edit
//           </button>

//           {/* Delete Button */}
//           <button
//             onClick={() => handleDelete(params.row)}
//             className="flex items-center bg-red-500 text-white px-4   h-9 rounded-md"
//           >
//             <FaTrashAlt className="mr-2" />
//             Delete
//           </button>
//         </div>
//       );
//     },
//   },
// ];


// //table column for seller in admin panel
// export const sellerTableColumns = [
//   {
//     disableColumnMenu: true,
//     field: "id",
//     headerName: "ID",
//     minWidth: 400,
//     headerAlign: "center",
//     align: "center",
//     editable: false,

//     headerClassName: "text-black font-semibold border",
//     cellClassName: "text-slate-700 font-normal border",
//     renderHeader: (params) => <span className="text-center">SellerID</span>,
//   },
//   {
//     disableColumnMenu: true,
//     field: "username",
//     headerName: "UserName",
//     minWidth: 400,
//     headerAlign: "center",
//     align: "center",
//     editable: false,
//     sortable: false,
//     headerClassName: "text-black font-semibold border",
//     cellClassName: "text-slate-700 font-normal border",
//     renderHeader: (params) => <span className="text-center">UserName</span>,
//   },
//   {
//     disableColumnMenu: true,
//     field: "email",
//     headerName: "Email",
//     align: "center",
//     width: 400,
//     editable: false,
//     sortable: false,
//     headerAlign: "center",
//     headerClassName: "text-black font-semibold text-center border ",
//     cellClassName: "text-slate-700 font-normal border text-center",
//     renderHeader: (params) => <span>Email</span>,
//     renderCell: (params) => {
//       return (
//         <div className="flex items-center justify-center gap-1">
//           <span>
//             <MdOutlineEmail className="text-slate-700 text-lg" />
//           </span>
//           <span>{params?.row?.email}</span>
//         </div>
//       );
//     },
//   },
// ];
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
    headerClassName: "text-slate-800 font-bold bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200",
    cellClassName: "text-slate-700 font-medium border-b border-slate-100 hover:bg-slate-50 transition-colors",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-2">
        <span className="text-sm font-bold uppercase tracking-wide">Product ID</span>
      </div>
    ),
  },
  {
    disableColumnMenu: true,
    field: "productName",
    headerName: "Product Name",
    align: "center",
    width: 260,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-slate-800 font-bold bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200",
    cellClassName: "text-slate-700 font-medium border-b border-slate-100 hover:bg-slate-50 transition-colors",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-2">
        <span className="text-sm font-bold uppercase tracking-wide">Product Name</span>
      </div>
    ),
    renderCell: (params) => (
      <div className="flex items-center justify-center py-2 px-2">
        <span className="text-slate-800 font-medium text-sm truncate max-w-full" title={params.value}>
          {params.value}
        </span>
      </div>
    ),
  },
  {
    disableColumnMenu: true,
    field: "price",
    headerName: "Price",
    minWidth: 200,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-slate-800 font-bold bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200",
    cellClassName: "text-slate-700 font-medium border-b border-slate-100 hover:bg-slate-50 transition-colors",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-2">
        <span className="text-sm font-bold uppercase tracking-wide">Price</span>
      </div>
    ),
    renderCell: (params) => (
      <div className="flex items-center justify-center py-2">
        <span className="text-green-600 font-bold text-sm">
          ${params.value?.toFixed(2) || '0.00'}
        </span>
      </div>
    ),
  },
  {
    disableColumnMenu: true,
    field: "quantity",
    headerName: "Quantity",
    minWidth: 200,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-slate-800 font-bold bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200",
    cellClassName: "text-slate-700 font-medium border-b border-slate-100 hover:bg-slate-50 transition-colors",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-2">
        <span className="text-sm font-bold uppercase tracking-wide">Quantity</span>
      </div>
    ),
    renderCell: (params) => (
      <div className="flex items-center justify-center py-2">
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
          params.value > 10 
            ? 'bg-green-100 text-green-800' 
            : params.value > 0 
            ? 'bg-yellow-100 text-yellow-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {params.value || 0}
        </div>
      </div>
    ),
  },
  {
    disableColumnMenu: true,
    field: "specialPrice",
    headerName: "Special Price",
    minWidth: 200,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-slate-800 font-bold bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200",
    cellClassName: "text-slate-700 font-medium border-b border-slate-100 hover:bg-slate-50 transition-colors",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-2">
        <span className="text-sm font-bold uppercase tracking-wide">Special Price</span>
      </div>
    ),
    renderCell: (params) => (
      <div className="flex items-center justify-center py-2">
        {params.value ? (
          <span className="text-red-600 font-bold text-sm">
            ${params.value?.toFixed(2)}
          </span>
        ) : (
          <span className="text-slate-400 text-xs">No discount</span>
        )}
      </div>
    ),
  },
  {
    sortable: false,
    field: "description",
    headerName: "Description",
    headerAlign: "center",
    align: "center",
    width: 200,
    editable: false,
    disableColumnMenu: true,
    headerClassName: "text-slate-800 font-bold bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200",
    cellClassName: "text-slate-700 font-medium border-b border-slate-100 hover:bg-slate-50 transition-colors",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-2">
        <span className="text-sm font-bold uppercase tracking-wide">Description</span>
      </div>
    ),
    renderCell: (params) => (
      <div className="flex items-center justify-center py-2 px-2">
        <span className="text-slate-600 text-xs truncate max-w-full" title={params.value}>
          {params.value || 'No description'}
        </span>
      </div>
    ),
  },
  {
    sortable: false,
    field: "image",
    headerName: "Image",
    headerAlign: "center",
    align: "center",
    width: 200,
    editable: false,
    disableColumnMenu: true,
    headerClassName: "text-slate-800 font-bold bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200",
    cellClassName: "text-slate-700 font-medium border-b border-slate-100 hover:bg-slate-50 transition-colors",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-2">
        <span className="text-sm font-bold uppercase tracking-wide">Image</span>
      </div>
    ),
    renderCell: (params) => (
      <div className="flex items-center justify-center py-2">
        {params.value ? (
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <FaImage className="text-green-600 text-sm" />
          </div>
        ) : (
          <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
            <FaImage className="text-slate-400 text-sm" />
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
    headerClassName: "text-slate-800 font-bold bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200",
    cellClassName: "text-slate-700 font-medium border-b border-slate-100",
    sortable: false,
    width: 400,
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-2">
        <span className="text-sm font-bold uppercase tracking-wide">Actions</span>
      </div>
    ),
    renderCell: (params) => {
      return (
        <div className="flex justify-center items-center space-x-2 h-full py-2 px-2">
          <button
            onClick={() => handleImageUpload(params.row)}
            className="flex items-center bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-xs font-medium"
            aria-label={`Upload image for ${params.row.productName}`}
          >
            <FaImage className="mr-1.5 text-sm" />
            Image
          </button>
          <button
            onClick={() => handleEdit(params.row)}
            className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-xs font-medium"
            aria-label={`Edit ${params.row.productName}`}
          >
            <FaEdit className="mr-1.5 text-sm" />
            Edit
          </button>
          <button
            onClick={() => handleDelete(params.row)}
            className="flex items-center bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-xs font-medium"
            aria-label={`Delete ${params.row.productName}`}
          >
            <FaTrashAlt className="mr-1.5 text-sm" />
            Delete
          </button>
          <button
            onClick={() => handleProductView(params.row)}
            className="flex items-center bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-xs font-medium"
            aria-label={`View ${params.row.productName}`}
          >
            <FaEye className="mr-1.5 text-sm" />
            View
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
    editable: false,
    headerClassName: "text-slate-800 font-bold bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200",
    cellClassName: "text-slate-700 font-medium border-b border-slate-100 hover:bg-slate-50 transition-colors",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-2">
        <span className="text-sm font-bold uppercase tracking-wide">Order ID</span>
      </div>
    ),
    renderCell: (params) => (
      <div className="flex items-center justify-center py-2">
        <span className="text-slate-800 font-mono text-xs bg-slate-100 px-2 py-1 rounded">
          #{params.value}
        </span>
      </div>
    ),
  },
  {
    disableColumnMenu: true,
    field: "email",
    headerName: "Customer Email",
    align: "center",
    width: 250,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-slate-800 font-bold bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200",
    cellClassName: "text-slate-700 font-medium border-b border-slate-100 hover:bg-slate-50 transition-colors",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-2">
        <span className="text-sm font-bold uppercase tracking-wide">Customer Email</span>
      </div>
    ),
    renderCell: (params) => (
      <div className="flex items-center justify-center gap-2 py-2 px-2">
        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
          <MdOutlineEmail className="text-blue-600 text-sm" />
        </div>
        <span className="text-slate-700 text-xs truncate max-w-[160px]" title={params.value}>
          {params.value}
        </span>
      </div>
    ),
  },
  {
    disableColumnMenu: true,
    field: "totalAmount",
    headerName: "Total Amount",
    align: "center",
    width: 200,
    editable: false,
    sortable: true,
    headerAlign: "center",
    headerClassName: "text-slate-800 font-bold bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200",
    cellClassName: "text-slate-700 font-medium border-b border-slate-100 hover:bg-slate-50 transition-colors",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-2">
        <span className="text-sm font-bold uppercase tracking-wide">Total Amount</span>
      </div>
    ),
    renderCell: (params) => (
      <div className="flex items-center justify-center py-2">
        <span className="text-green-600 font-bold text-sm bg-green-50 px-3 py-1 rounded-full">
          ${params.value?.toFixed(2) || '0.00'}
        </span>
      </div>
    ),
  },
  {
    disableColumnMenu: true,
    field: "status",
    headerName: "Order Status",
    align: "center",
    width: 200,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-slate-800 font-bold bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200",
    cellClassName: "text-slate-700 font-medium border-b border-slate-100 hover:bg-slate-50 transition-colors",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-2">
        <span className="text-sm font-bold uppercase tracking-wide">Order Status</span>
      </div>
    ),
    renderCell: (params) => {
      const getStatusStyle = (status) => {
        const statusLower = status?.toLowerCase() || '';
        if (statusLower.includes('delivered')) return 'bg-green-100 text-green-800 border-green-200';
        if (statusLower.includes('shipped')) return 'bg-blue-100 text-blue-800 border-blue-200';
        if (statusLower.includes('processing')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        if (statusLower.includes('cancelled')) return 'bg-red-100 text-red-800 border-red-200';
        if (statusLower.includes('pending')) return 'bg-orange-100 text-orange-800 border-orange-200';
        return 'bg-slate-100 text-slate-800 border-slate-200';
      };

      return (
        <div className="flex items-center justify-center py-2">
          <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(params.value)}`}>
            {params.value || 'Unknown'}
          </div>
        </div>
      );
    },
  },
  {
    disableColumnMenu: true,
    field: "date",
    headerName: "Order Date",
    align: "center",
    width: 200,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-slate-800 font-bold bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200",
    cellClassName: "text-slate-700 font-medium border-b border-slate-100 hover:bg-slate-50 transition-colors",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-2">
        <span className="text-sm font-bold uppercase tracking-wide">Order Date</span>
      </div>
    ),
    renderCell: (params) => (
      <div className="flex items-center justify-center py-2">
        <span className="text-slate-600 text-xs font-medium">
          {params.value ? new Date(params.value).toLocaleDateString() : 'N/A'}
        </span>
      </div>
    ),
  },
  {
    field: "action",
    headerName: "Actions",
    headerAlign: "center",
    editable: false,
    headerClassName: "text-slate-800 font-bold bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200",
    cellClassName: "text-slate-700 font-medium border-b border-slate-100",
    sortable: false,
    width: 250,
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-2">
        <span className="text-sm font-bold uppercase tracking-wide">Actions</span>
      </div>
    ),
    renderCell: (params) => {
      return (
        <div className='flex justify-center items-center space-x-2 h-full py-2'>
          <button
            onClick={() => handleEdit(params.row)}
            className='flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-xs font-medium'
            aria-label={`Edit order #${params.row.id}`}
          >
            <FaEdit className='mr-2 text-sm'/>
            Edit Status
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
    headerClassName: "text-slate-800 font-bold bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200",
    cellClassName: "text-slate-700 font-medium border-b border-slate-100 hover:bg-slate-50 transition-colors",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-2">
        <span className="text-sm font-bold uppercase tracking-wide">Category ID</span>
      </div>
    ),
    renderCell: (params) => (
      <div className="flex items-center justify-center py-2">
        <span className="text-slate-800 font-mono text-xs bg-slate-100 px-2 py-1 rounded">
          #{params.value}
        </span>
      </div>
    ),
  },
  {
    disableColumnMenu: true,
    field: "categoryName",
    headerName: "Category Name",
    align: "center",
    width: 400,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-slate-800 font-bold bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200",
    cellClassName: "text-slate-700 font-medium border-b border-slate-100 hover:bg-slate-50 transition-colors",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-2">
        <span className="text-sm font-bold uppercase tracking-wide">Category Name</span>
      </div>
    ),
    renderCell: (params) => (
      <div className="flex items-center justify-center py-2 px-2">
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2 rounded-lg font-medium text-sm">
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
    headerClassName: "text-slate-800 font-bold bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200",
    cellClassName: "text-slate-700 font-medium border-b border-slate-100",
    sortable: false,
    width: 400,
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-2">
        <span className="text-sm font-bold uppercase tracking-wide">Actions</span>
      </div>
    ),
    renderCell: (params) => {
      return (
        <div className="flex justify-center space-x-3 h-full py-2">
          <button
            onClick={() => handleEdit(params.row)}
            className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-xs font-medium"
            aria-label={`Edit category ${params.row.categoryName}`}
          >
            <FaEdit className="mr-2 text-sm" />
            Edit
          </button>
          <button
            onClick={() => handleDelete(params.row)}
            className="flex items-center bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-xs font-medium"
            aria-label={`Delete category ${params.row.categoryName}`}
          >
            <FaTrashAlt className="mr-2 text-sm" />
            Delete
          </button>
        </div>
      );
    },
  },
];

export const sellerTableColumns = [
  {
    disableColumnMenu: true,
    field: "id",
    headerName: "Seller ID",
    minWidth: 400,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-slate-800 font-bold bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200",
    cellClassName: "text-slate-700 font-medium border-b border-slate-100 hover:bg-slate-50 transition-colors",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-2">
        <span className="text-sm font-bold uppercase tracking-wide">Seller ID</span>
      </div>
    ),
    renderCell: (params) => (
      <div className="flex items-center justify-center py-2">
        <span className="text-slate-800 font-mono text-xs bg-slate-100 px-2 py-1 rounded">
          #{params.value}
        </span>
      </div>
    ),
  },
  {
    disableColumnMenu: true,
    field: "username",
    headerName: "Username",
    minWidth: 400,
    headerAlign: "center",
    align: "center",
    editable: false,
    sortable: false,
    headerClassName: "text-slate-800 font-bold bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200",
    cellClassName: "text-slate-700 font-medium border-b border-slate-100 hover:bg-slate-50 transition-colors",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-2">
        <span className="text-sm font-bold uppercase tracking-wide">Username</span>
      </div>
    ),
    renderCell: (params) => (
      <div className="flex items-center justify-center py-2 px-2">
        <div className="bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-800 px-4 py-2 rounded-lg font-medium text-sm">
          @{params.value || 'unknown'}
        </div>
      </div>
    ),
  },
  {
    disableColumnMenu: true,
    field: "email",
    headerName: "Email Address",
    align: "center",
    width: 400,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-slate-800 font-bold bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200",
    cellClassName: "text-slate-700 font-medium border-b border-slate-100 hover:bg-slate-50 transition-colors",
    renderHeader: (params) => (
      <div className="flex items-center justify-center py-2">
        <span className="text-sm font-bold uppercase tracking-wide">Email Address</span>
      </div>
    ),
    renderCell: (params) => {
      return (
        <div className="flex items-center justify-center gap-3 py-2 px-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shadow-sm">
            <MdOutlineEmail className="text-blue-600 text-lg" />
          </div>
          <div className="bg-slate-50 px-3 py-2 rounded-lg border">
            <span className="text-slate-700 text-xs font-medium" title={params?.row?.email}>
              {params?.row?.email || 'No email provided'}
            </span>
          </div>
        </div>
      );
    },
  },
];