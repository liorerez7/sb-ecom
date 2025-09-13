import React, { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { sellerTableColumns } from "../../helper/tableColumn";
import { Paper, Box } from "@mui/material";

const SellerTable = ({ sellers, pagination }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const params = new URLSearchParams(searchParams);

  // התאמה לתבנית ההטמעה שלך (pageNumber הוא 0-based מהשרת)
  const [currentPage, setCurrentPage] = useState(
    (pagination?.pageNumber ?? 0) + 1
  );

  const tableRecords = sellers?.map((item) => ({
    id: item.userId,
    username: item.username,
    email: item.email,
  }));

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1; // 1-based ל־UI
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`);
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
          columns={sellerTableColumns}
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
  );
};

export default SellerTable;
