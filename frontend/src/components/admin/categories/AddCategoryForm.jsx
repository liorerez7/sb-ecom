import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import {
  createCategoryDashboardAction,
  updateCategoryDashboardAction,
} from "../../../store/actions";
import InputField from "../../shared/InputField";

const AddCategoryForm = ({ setOpen, open, category, update = false, onSaved = () => {} }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const addNewCategoryHandler = (data) => {
    if (!update) {
      // יצירה
      dispatch(
        createCategoryDashboardAction(data, setOpen, reset, toast)
      );
      // רענון UI מיידי (שינוי מינימלי למען חוויית משתמש)
      onSaved();
    } else {
      // עדכון
      dispatch(
        updateCategoryDashboardAction(data, setOpen, category.id, reset, toast)
      );
      // רענון UI מיידי
      onSaved();
    }
  };

  useEffect(() => {
    if (update && category) {
      setValue("categoryName", category?.categoryName);
    }
  }, [update, category, setValue]);

  return (
    <div className="relative h-full">
      <form
        className="space-y-5 py-4"
        onSubmit={handleSubmit(addNewCategoryHandler)}
      >
        {/* Section */}
        <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100">
          <h3 className="text-sm font-semibold text-blue-900 mb-3">
            Category Details
          </h3>
          <div className="flex md:flex-row flex-col gap-4 w-full">
            <InputField
              label="Category Name"
              required
              id="categoryName"
              type="text"
              message="This field is required*"
              placeholder="Category Name"
              register={register}
              errors={errors}
              className="bg-white"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center gap-3">
          <button
            disabled={open}
            onClick={() => setOpen(false)}
            type="button"
            className="border border-gray-300 rounded-lg text-gray-700 py-[10px] px-4 text-sm font-medium hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            disabled={open}
            type="submit"
            className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-[10px] px-4 text-sm font-medium shadow-md hover:shadow-lg transition"
          >
            {open ? "Loading.." : update ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;
