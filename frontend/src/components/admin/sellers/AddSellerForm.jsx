import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { addNewDashboardSeller } from "../../../store/actions";
import InputField from "../../shared/InputField";
import Spinners from "../../shared/Spinners";

const AddSellerForm = ({ setOpen, onSaved = () => {} }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const addSellerHandler = (data) => {
    const sendData = { ...data, roles: ["seller"] };
    dispatch(addNewDashboardSeller(sendData, toast, reset, setOpen, setLoader));
    // ריענון UI מיידי לאחר ההוספה (שינוי לא־פולשני לחוויית משתמש)
    onSaved();
  };

  return (
    <div className="relative h-full">
      <form className="space-y-5 py-4" onSubmit={handleSubmit(addSellerHandler)}>
        <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100">
          <h3 className="text-sm font-semibold text-blue-900 mb-3">Seller Details</h3>

          <div className="flex flex-col gap-4 w-full">
            <InputField
              label="UserName"
              required
              id="username"
              type="text"
              message="*UserName is required"
              placeholder="Enter your username"
              register={register}
              errors={errors}
              className="bg-white"
            />
            <InputField
              label="Email"
              required
              id="email"
              type="email"
              message="*Email is required"
              placeholder="Enter your email"
              register={register}
              errors={errors}
              className="bg-white"
            />
            <InputField
              label="Password"
              required
              id="password"
              type="password"
              message="*Password is required"
              placeholder="Enter your password"
              register={register}
              errors={errors}
              className="bg-white"
            />
          </div>
        </div>

        <div className="flex justify-between items-center gap-3">
          <button
            disabled={loader}
            onClick={() => setOpen(false)}
            type="button"
            className="border border-gray-300 rounded-lg text-gray-700 py-[10px] px-4 text-sm font-medium hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            disabled={loader}
            type="submit"
            className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-[10px] px-4 text-sm font-medium shadow-md hover:shadow-lg transition"
          >
            {loader ? (
              <div className="flex gap-2 items-center">
                <Spinners /> Loading..
              </div>
            ) : (
              "Add New Seller"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSellerForm;
