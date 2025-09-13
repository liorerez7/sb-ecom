import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Spinners from "../../shared/Spinners";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderStatusFromDashboard } from "../../../store/actions";
import toast from "react-hot-toast";

const ORDER_STATUSES = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Accepted",
];

const UpdateOrderForm = ({
  setOpen,
  selectedId,
  selectedItem,
  loader,
  setLoader,
  onUpdated = () => {},
}) => {
  const [orderStatus, setOrderStatus] = useState(
    selectedItem?.status || "Accepted"
  );
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

  const updateOrderStatus = async (e) => {
    e.preventDefault();
    if (!orderStatus) {
      setError("Order status is required");
      return;
    }
    // נשארת אותה לוגיקה — רק מוסיף רענון עדין ל־UI בסיום
    dispatch(
      updateOrderStatusFromDashboard(
        selectedId,
        orderStatus,
        toast,
        setLoader,
        isAdmin
      )
    );
    // רענון קל של הרשימה (תואם את Sellers עם פרמטר t ב־URL)
    onUpdated();
  };

  return (
    <div className="py-5 relative h-full">
      <form className="space-y-5" onSubmit={updateOrderStatus}>
        <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100">
          <h3 className="text-sm font-semibold text-blue-900 mb-3">
            Update Status
          </h3>

          <FormControl fullWidth variant="outlined" error={!!error} size="medium">
            <InputLabel id="order-status-label">Order Status</InputLabel>
            <Select
              labelId="order-status-label"
              label="Order Status"
              value={orderStatus}
              onChange={(e) => {
                setOrderStatus(e.target.value);
                setError("");
              }}
            >
              {ORDER_STATUSES.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>

            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        </div>

        <div className="flex justify-between items-center gap-3">
          <Button
            disabled={loader}
            onClick={() => setOpen(false)}
            variant="outlined"
            className="border border-gray-300 rounded-lg py-[10px] px-4 text-sm font-medium"
          >
            Cancel
          </Button>

          <Button
            disabled={loader}
            type="submit"
            variant="contained"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-[10px] px-4 text-sm font-medium shadow-md hover:shadow-lg transition"
          >
            {loader ? (
              <div className="flex gap-2 items-center">
                <Spinners /> Loading...
              </div>
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateOrderForm;
