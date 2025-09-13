import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { adminOrderTableColumn } from "../../helper/tableColumn";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Modal from "../../shared/Modal";
import UpdateOrderForm from "./updateOrderForm.jsx";
import { Paper, Box } from "@mui/material";

const OrderTable = ({ adminOrder, pagination, onRefresh = () => {} }) => {
  const [updateOpenModal, setUpdateOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

  const [currentPage, setCurrentPage] = useState(
    (pagination?.pageNumber ?? 0) + 1
  );

  const tableRecords =
    adminOrder?.map((item) => ({
      id: item.orderId,
      email: item.email,
      totalAmount: item.totalAmount,
      status: item.orderStatus,
      date: item.orderDate,
    })) ?? [];

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1; // 1-based ל־UI
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`);
  };

  const handleEdit = (order) => {
    setSelectedItem(order);
    setUpdateOpenModal(true);
  };

  return (
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
          columns={adminOrderTableColumn(handleEdit)}
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

      <Modal
        open={updateOpenModal}
        setOpen={setUpdateOpenModal}
        title="Update Order Status"
      >
        <UpdateOrderForm
          setOpen={setUpdateOpenModal}
          loader={loader}
          setLoader={setLoader}
          selectedId={selectedItem?.id}
          selectedItem={selectedItem}
          onUpdated={onRefresh}
        />
      </Modal>
    </Paper>
  );
};

export default OrderTable;
