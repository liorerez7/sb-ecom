// import React, { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form'
// import InputField from '../../shared/InputField';
// import { Button } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { addNewProductFromDashboard, fetchCategories, updateProductFromDashboard } from '../../../store/actions';
// import toast from 'react-hot-toast';
// import Spinners from '../../shared/Spinners';
// import SelectTextField from '../../shared/SelectTextField';
// import {Skeleton} from '../../shared/Skeleton';
// import ErrorPage from '../../shared/ErrorPage';

// const AddProductForm = ({ setOpen, product, update=false}) => {
// const [loader, setLoader] = useState(false);
// const [selectedCategory, setSelectedCategory] = useState();
// const { categories } = useSelector((state) => state.products);
// const { categoryLoader, errorMessage } = useSelector((state) => state.errors);
// const { user } = useSelector((state) => state.auth);
// const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

// const dispatch = useDispatch();
//     const {
//         register,
//         handleSubmit,
//         reset,
//         setValue,
//         watch,
//         formState: { errors }
//     } = useForm({
//         mode: "onTouched"
//     });

//     const priceValue = watch("price");
//     const discountValue = watch("discount");
//     useEffect(() => {
//         const price = parseFloat(priceValue) || 0;
//         const discount = parseFloat(discountValue) || 0;
//         const special = parseFloat(price - (discount / 100) * price);
//         if (!isNaN(special)) {
//             setValue("specialPrice", special.toFixed(2));
//         }
//     }, [priceValue, discountValue, setValue]);

//     const saveProductHandler = (data) => {
//         if(!update) {
//             // create new product logic
//             const sendData = {
//                 ...data,
//                 productId: product.id,
//                 price: parseFloat(data.price),
//                 discount: parseFloat(data.discount),
//                 specialPrice: parseFloat(data.specialPrice),
//                 quantity: parseInt(data.quantity),
//                 categoryId: selectedCategory.categoryId,
//             };
//             dispatch(addNewProductFromDashboard(
//                 sendData, toast, reset, setLoader, setOpen, isAdmin
//             ));
//         } else {
//             const sendData = {
//                 ...data,
//                 productId: product.productId,
//                 price: parseFloat(data.price),
//                 discount: parseFloat(data.discount),
//                 specialPrice: parseFloat(data.specialPrice),
//                 quantity: parseInt(data.quantity),
//             };
//             dispatch(updateProductFromDashboard(sendData, toast, reset, setLoader, setOpen, isAdmin));
//         }
//     };


//     useEffect(() => {
//         if (update && product) {
//             setValue("productName", product?.productName);
//             setValue("price", product?.price);
//             setValue("quantity", product?.quantity);
//             setValue("discount", product?.discount);
//             setValue("specialPrice", parseFloat(product?.specialPrice) || product?.specialPrice);
//             setValue("description", product?.description);
//         }
//     }, [update, product]);


//     useEffect(() => {
//         if (!update) {
//             dispatch(fetchCategories());
//         }
//     }, [dispatch, update]);

//     useEffect(() => {
//         if (!categoryLoader && categories) {
//             setSelectedCategory(categories[0]);
//         }
//     }, [categories, categoryLoader]);

//     if (categoryLoader) return <Skeleton />
//     if (errorMessage) return <ErrorPage message={errorMessage} />

//   return (
//     <div className='py-5 relative h-full'>
//         <form className='space-y-4'
//             onSubmit={handleSubmit(saveProductHandler)}>
//             <div className='flex md:flex-row flex-col gap-4 w-full'>
//                 <InputField 
//                     label="Product Name"
//                     required
//                     id="productName"
//                     type="text"
//                     message="This field is required*"
//                     register={register}
//                     placeholder="Product Name"
//                     errors={errors}
//                     />

//                 {!update && (
//                     <SelectTextField
//                         label="Select Categories"
//                         select={selectedCategory}
//                         setSelect={setSelectedCategory}
//                         lists={categories}
//                     />
//                 )}
//             </div>

//             <div className='flex md:flex-row flex-col gap-4 w-full'>
//                 <InputField 
//                     label="Price"
//                     required
//                     id="price"
//                     type="number"
//                     step="0.01"
//                     message="This field is required*"
//                     placeholder="Product Price"
//                     register={register}
//                     errors={errors}
//                     />

//                     <InputField 
//                     label="Quantity"
//                     required
//                     id="quantity"
//                     type="number"
//                     message="This field is required*"
//                     register={register}
//                     placeholder="Product Quantity"
//                     errors={errors}
//                     />
//             </div>
//         <div className="flex md:flex-row flex-col gap-4 w-full">
//           <InputField
//             label="Discount"
//             id="discount"
//             type="number"
//             step="0.01"
//             message="This field is required*"
//             placeholder="Product Discount"
//             register={register}
//             errors={errors}
//           />
//           <InputField
//             label="Special Price"
//             id="specialPrice"
//             type="number"
//             step="0.01"
//             message="This field is required*"
//             placeholder="Special Price"
//             register={register}
//             errors={errors}
//             readOnly
//           />
//         </div>

//         <div className="flex flex-col gap-2 w-full">
//             <label htmlFor='desc'
//               className='font-semibold text-sm text-slate-800'>
//                 Description
//             </label>

//             <textarea
//                 rows={5}
//                 placeholder="Add product description...."
//                 className={`px-4 py-2 w-full border outline-hidden bg-transparent text-slate-800 rounded-md ${
//                     errors["description"]?.message ? "border-red-500" : "border-slate-700" 
//                 }`}
//                 maxLength={255}
//                 {...register("description", {
//                     required: {value: true, message:"Description is required"},
//                 })}
//                 />

//                 {errors["description"]?.message && (
//                     <p className="text-sm font-semibold text-red-600 mt-0">
//                         {errors["description"]?.message}
//                     </p>
//                 )}
//         </div>

//         <div className='flex w-full justify-between items-center absolute bottom-14'>
//             <Button disabled={loader}
//                     onClick={() => setOpen(false)}
//                     variant='outlined'
//                     className='text-white py-[10px] px-4 text-sm font-medium'>
//                 Cancel
//             </Button>

//             <Button
//                 disabled={loader}
//                 type='submit'
//                 variant='contained'
//                 color='primary'
//                 className='bg-custom-blue text-white  py-[10px] px-4 text-sm font-medium'>
//                 {loader ? (
//                     <div className='flex gap-2 items-center'>
//                         <Spinners /> Loading...
//                     </div>
//                 ) : (
//                     "Save"
//                 )}
//             </Button>
//         </div>
//         </form>
//     </div>
//   )
// }

// export default AddProductForm

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../shared/InputField';
import { Button, LinearProgress, Divider, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProductFromDashboard, fetchCategories, updateProductFromDashboard } from '../../../store/actions';
import toast from 'react-hot-toast';
import Spinners from '../../shared/Spinners';
import SelectTextField from '../../shared/SelectTextField';
import { Skeleton } from '../../shared/Skeleton';
import ErrorPage from '../../shared/ErrorPage';
import { FaInfoCircle, FaTag, FaBox, FaDollarSign, FaPercent } from 'react-icons/fa';
import { MdInventory, MdDescription } from 'react-icons/md';

const AddProductForm = ({ setOpen, product, update = false }) => {
  const [loader, setLoader] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const { categories } = useSelector((state) => state.products);
  const { categoryLoader, errorMessage } = useSelector((state) => state.errors);
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    mode: "onTouched"
  });

  const priceValue = watch("price");
  const discountValue = watch("discount");
  
  useEffect(() => {
    const price = parseFloat(priceValue) || 0;
    const discount = parseFloat(discountValue) || 0;
    const special = parseFloat(price - (discount / 100) * price);
    if (!isNaN(special)) {
      setValue("specialPrice", special.toFixed(2));
    }
  }, [priceValue, discountValue, setValue]);

  const saveProductHandler = (data) => {
    if (!update) {
      const sendData = {
        ...data,
        productId: product.id,
        price: parseFloat(data.price),
        discount: parseFloat(data.discount),
        specialPrice: parseFloat(data.specialPrice),
        quantity: parseInt(data.quantity),
        categoryId: selectedCategory.categoryId,
      };
      dispatch(addNewProductFromDashboard(
        sendData, toast, reset, setLoader, setOpen, isAdmin
      ));
    } else {
      const sendData = {
        ...data,
        productId: product.productId,
        price: parseFloat(data.price),
        discount: parseFloat(data.discount),
        specialPrice: parseFloat(data.specialPrice),
        quantity: parseInt(data.quantity),
      };
      dispatch(updateProductFromDashboard(sendData, toast, reset, setLoader, setOpen, isAdmin));
    }
  };

  useEffect(() => {
    if (update && product) {
      setValue("productName", product?.productName);
      setValue("price", product?.price);
      setValue("quantity", product?.quantity);
      setValue("discount", product?.discount);
      setValue("specialPrice", parseFloat(product?.specialPrice) || product?.specialPrice);
      setValue("description", product?.description);
    }
  }, [update, product]);

  useEffect(() => {
    if (!update) {
      dispatch(fetchCategories());
    }
  }, [dispatch, update]);

  useEffect(() => {
    if (!categoryLoader && categories) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, categoryLoader]);

  if (categoryLoader) return <Skeleton />
  if (errorMessage) return <ErrorPage message={errorMessage} />

  return (
    <div className='relative h-full'>
      {loader && <LinearProgress className="absolute top-0 left-0 right-0" />}
      
      <form className='space-y-5 py-4' onSubmit={handleSubmit(saveProductHandler)}>
        {/* Product Info Section */}
        <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100">
          <h3 className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2">
            <FaBox className="text-blue-600" />
            Product Information
          </h3>
          
          <div className='flex md:flex-row flex-col gap-4 w-full'>
            <div className="flex-1">
              <InputField 
                label="Product Name"
                required
                id="productName"
                type="text"
                message="Product name is required"
                register={register}
                placeholder="Enter product name"
                errors={errors}
                className="bg-white"
              />
            </div>

            {!update && (
              <div className="flex-1">
                <SelectTextField
                  label="Category"
                  select={selectedCategory}
                  setSelect={setSelectedCategory}
                  lists={categories}
                />
              </div>
            )}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-green-50/50 rounded-lg p-4 border border-green-100">
          <h3 className="text-sm font-semibold text-green-900 mb-3 flex items-center gap-2">
            <FaDollarSign className="text-green-600" />
            Pricing & Inventory
          </h3>
          
          <div className='flex md:flex-row flex-col gap-4 w-full mb-4'>
            <div className="flex-1">
              <InputField 
                label="Price ($)"
                required
                id="price"
                type="number"
                step="0.01"
                message="Price is required"
                placeholder="0.00"
                register={register}
                errors={errors}
                className="bg-white"
              />
            </div>

            <div className="flex-1">
              <InputField 
                label="Stock Quantity"
                required
                id="quantity"
                type="number"
                message="Quantity is required"
                register={register}
                placeholder="0"
                errors={errors}
                className="bg-white"
              />
            </div>
          </div>

          <div className="flex md:flex-row flex-col gap-4 w-full">
            <div className="flex-1">
              <InputField
                label="Discount (%)"
                id="discount"
                type="number"
                step="0.01"
                placeholder="0"
                register={register}
                errors={errors}
                className="bg-white"
              />
            </div>
            
            <div className="flex-1">
              <InputField
                label="Special Price ($)"
                id="specialPrice"
                type="number"
                step="0.01"
                placeholder="Calculated automatically"
                register={register}
                errors={errors}
                readOnly
                className="bg-gray-50 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <FaInfoCircle className="text-gray-400" />
                Auto-calculated based on discount
              </p>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-purple-50/50 rounded-lg p-4 border border-purple-100">
          <h3 className="text-sm font-semibold text-purple-900 mb-3 flex items-center gap-2">
            <MdDescription className="text-purple-600" />
            Product Description
          </h3>
          
          <div className="flex flex-col gap-2 w-full">
            <textarea
              rows={4}
              placeholder="Enter detailed product description..."
              className={`px-4 py-3 w-full border rounded-lg bg-white text-gray-800 transition-colors duration-200 resize-none focus:outline-none focus:ring-2 ${
                errors["description"]?.message 
                  ? "border-red-400 focus:ring-red-200" 
                  : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"
              }`}
              maxLength={255}
              {...register("description", {
                required: { value: true, message: "Description is required" },
              })}
            />
            
            <div className="flex justify-between items-center">
              {errors["description"]?.message && (
                <p className="text-xs font-medium text-red-600">
                  {errors["description"]?.message}
                </p>
              )}
              <span className="text-xs text-gray-500 ml-auto">
                Max 255 characters
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <Divider className="my-4" />
        
        <div className='flex justify-between items-center gap-3'>
          <Button 
            disabled={loader}
            onClick={() => setOpen(false)}
            variant='outlined'
            color="inherit"
            className='px-6 py-2.5 text-gray-700 hover:bg-gray-50 font-medium'
          >
            Cancel
          </Button>

          <Button
            disabled={loader}
            type='submit'
            variant='contained'
            className='bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 font-medium shadow-md hover:shadow-lg transition-all duration-200'
          >
            {loader ? (
              <div className='flex gap-2 items-center'>
                <Spinners /> 
                <span>{update ? 'Updating...' : 'Creating...'}</span>
              </div>
            ) : (
              <span>{update ? 'Update Product' : 'Create Product'}</span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;