import api from '../../api/api';

export const fetchProducts = (queryString) => async (dispatch) => {
    try {
        dispatch({type: 'IS_FETCHING'});
        const { data } = await api.get(`/public/products?${queryString}`);
        dispatch({ 
            type: 'FETCH_PRODUCTS_SUCCESS',
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
         });
         dispatch({type: 'IS_SUCCESS'});
         
    } catch (error) {
        dispatch({
            type: 'IS_ERROR',
            payload: error?.response?.data?.message || "Failed to fetch products",});
    }
};

export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch({type: 'CATEGORY_LOADER'});
        const { data } = await api.get(`/public/categories`);
        dispatch({ 
            type: 'FETCH_CATEGORIES_SUCCESS',
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
         });
         dispatch({type: 'CATEGORY_SUCCESS'});
         
    } catch (error) {
        dispatch({
            type: 'IS_ERROR',
            payload: error?.response?.data?.message || "Failed to fetch categories",});
    }
};


// export const addToCart = (data, qty = 1, toast) => (dispatch, getState) => {

//     const {products} = getState().products;
//     const getProduct = products.find((product) => product.productId === data.productId);
//     const isQuantityExist = getProduct?.quantity >= qty;

//     if(isQuantityExist){
//         dispatch({type: 'ADD_TO_CART', payload: {...data, quantity: qty}});
//         localStorage.setItem('cartItems', JSON.stringify(getState().carts.cart));
//         toast.success(`${data.productName} added to cart`);
//     } else{
//         toast.error(`${data.productName} is out of stock`);
//     }


// };

export const addToCart = (data, qty = 1, toast) => (dispatch, getState) => {
  // data.quantity שמגיע מהכרטיס = מלאי המוצר בדף המוצרים
  const stock = Number(data.quantity ?? 0);

  dispatch({
    type: 'ADD_TO_CART',
    payload: {
      ...data,
      stock,          // שומרים מלאי קבוע בפריט העגלה
      quantity: qty,  // זו הכמות בעגלה, לא המלאי
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().carts.cart));
  toast?.success?.(`${data.productName} added to cart`);
};



// export const increaseCartQuantity =
//   (data, toast, currentQuantity, setCurrentQuantity) =>
//   (dispatch, getState) => {
//     const { products } = getState().products;
//     const getProduct = products.find((p) => p.productId === data.productId);

//     const nextQty = Number(currentQuantity ?? 0) + 1;
//     const isQuantityExist = (getProduct?.quantity ?? 0) >= nextQty;

//     if (isQuantityExist) {
//       setCurrentQuantity(nextQty);
//       dispatch({
//         type: 'ADD_TO_CART',
//         payload: { ...data, quantity: nextQty },
//       });
//       localStorage.setItem('cartItems', JSON.stringify(getState().carts.cart));
//     } else {
//       toast?.error?.(`${data.productName} is out of stock`);
//     }
// };
export const increaseCartQuantity =
  (data, toast, currentQuantity, setCurrentQuantity) =>
  (dispatch, getState) => {
    const { cart } = getState().carts;
    const itemInCart = Array.isArray(cart)
      ? cart.find(i => i.productId === data.productId)
      : null;

    const baseQty = Number(itemInCart?.quantity ?? currentQuantity ?? 0);
    const nextQty = baseQty + 1;

    const { products } = getState().products;
    const getProduct = Array.isArray(products)
      ? products.find(p => p.productId === data.productId)
      : null;

    const stock = Number(
      itemInCart?.stock ??
      data?.stock ??
      getProduct?.quantity ??
      0
    );

    console.log("[increaseCartQuantity DEBUG]", {
      productId: data.productId,
      productName: data.productName,
      baseQty,
      nextQty,
      stockFromCart: itemInCart?.stock,
      stockFromData: data?.stock,
      stockFromProducts: getProduct?.quantity,
      finalStock: stock
    });

    if (nextQty <= stock) {
      setCurrentQuantity?.(nextQty);
      dispatch({
        type: 'ADD_TO_CART',
        payload: { ...(itemInCart || data), quantity: nextQty, stock },
      });
      localStorage.setItem('cartItems', JSON.stringify(getState().carts.cart));
    } else {
      toast?.error?.(`${itemInCart?.productName ?? data.productName} is out of stock`);
    }
  };




// export const decreaseCartQuantity = 
// (data, newQuantity) => (dispatch, getState) => {
//     dispatch({
//         type: "ADD_TO_CART",
//         payload: {...data, quantity: newQuantity},
//     });
//     localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart))
// };
export const decreaseCartQuantity =
  (data, newQuantity) => (dispatch, getState) => {
    const { cart } = getState().carts;
    const itemInCart = Array.isArray(cart)
      ? cart.find(i => i.productId === data.productId)
      : null;

    const stock = Number(itemInCart?.stock ?? data?.stock ?? 0);

    console.log("[decreaseCartQuantity DEBUG]", {
      productId: data.productId,
      productName: data.productName,
      newQuantity,
      stockFromCart: itemInCart?.stock,
      stockFromData: data?.stock,
      finalStock: stock
    });

    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...(itemInCart || data), quantity: newQuantity, stock },
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().carts.cart));
  };



export const removeFromCart = (data, toast) => (dispatch, getState) => {
    dispatch({type: 'REMOVE_FROM_CART', payload: data});
    toast.success(`${data.productName} removed from cart`);
    localStorage.setItem('cartItems', JSON.stringify(getState().carts.cart));
};

export const authenticateSignInUser = (sendData, toast, reset, navigate, setLoader) => async(dispatch) => {
    try {
        setLoader(true);
        const {data} = await api.post('/auth/signin', sendData);
        dispatch({type: 'LOGIN_USER', payload: data});
        localStorage.setItem('auth', JSON.stringify(data));
        toast.success("Login successful");
        reset();
        navigate('/');
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Login failed");
    } finally {
        setLoader(false);
    }
};


export const registerNewUser = (sendData, toast, reset, navigate, setLoader) => async(dispatch) => {
    try {
        setLoader(true);
        const {data} = await api.post('/auth/signup', sendData);
        toast.success(data?.message || "User registered successfully");
        dispatch({ type: "IS_SUCCESS" });
        reset();
        dispatch({ type: "IS_SUCCESS" });

        navigate('/login');
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
        setLoader(false);
    }
};

export const logOutUser = (toast, navigate) => async (dispatch) => {
    try {
        // לקרוא ל־signout כדי למחוק את העוגייה מהשרת
        await api.post('/auth/signout');
    } catch (e) {
        console.error(e);
    }

    dispatch({ type: 'LOGOUT_USER' });
    dispatch({ type: 'CLEAR_CART' });
    dispatch({ type: 'REMOVE_CLIENT_SECRET_ADDRESS' });
    dispatch({ type: 'REMOVE_CHECKOUT_ADDRESS' });


    localStorage.removeItem('stripe_idem');
    localStorage.removeItem('auth');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('CHECKOUT_ADDRESS');
    localStorage.removeItem('client-secret');

    toast.success("Logged out successfully");
    navigate('/login');
};



export const addAddressHandler = (sendData, toast, addressId, setOpenAddressModal) => async (dispatch, getState) => {
    
    dispatch({type: "BUTTON_LOADER"});

    try {
        if(addressId) {
            await api.put(`/addresses/${addressId}`, sendData);
            toast.success("Address updated successfully");
            dispatch({type: "IS_SUCCESS"});
        } else {
                await api.post("/addresses", sendData);
                toast.success("Address added successfully");
                dispatch({type: "IS_SUCCESS"});
        }
        dispatch(getUserAddresses());
        
    } catch (error) {
        console.error("❌ POST /addresses failed:");
        console.error("⛔ Error message:", error?.message);
        console.error("📨 error.response:", error?.response);
        console.error("📄 error.response.data:", error?.response?.data);
        console.error("🔁 Full Axios error:", error);
        toast.error(error?.response?.data?.message || "Registration failed");
        dispatch({type: "IS_ERROR", payload: null});
    } finally {
        setOpenAddressModal(false);
    }

}

export const getUserAddresses = () => async (dispatch, getState) => {

    const {user} = getState().auth;

    try {
        dispatch({type: 'IS_FETCHING'});
        const { data } = await api.get(`/users/addresses`); // maybe only : "/addresses" . need to check with him again
        dispatch({ 
            type: 'USER_ADDRESSES',
            payload: data,
         });
         dispatch({type: 'IS_SUCCESS'});

    } catch (error) {
        dispatch({
            type: 'IS_ERROR',
            payload: error?.response?.data?.message || "Failed to fetch addresses",});
    }
};


export const selectUserCheckoutAddress = (address) => {
    localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(address));

    return {
        type: 'SELECT_CHECKOUT_ADDRESS',
        payload: address,
    }
}

export const deleteUserAddress = (toast, addressId, setOpenDeleteModal) => async (dispatch, getState) => {
    dispatch({type: "BUTTON_LOADER"});
    try {
        await api.delete(`/addresses/${addressId}`);
        toast.success("Address deleted successfully");
        dispatch({type: "IS_SUCCESS"});
        dispatch(getUserAddresses());
        dispatch(clearCheckoutAddress());
        setOpenDeleteModal(false);
    } catch (error) {
        console.error("❌ DELETE /addresses/:addressId failed:");
        console.error("⛔ Error message:", error?.message);
        console.error("📨 error.response:", error?.response);
        console.error("📄 error.response.data:", error?.response?.data);
        console.error("🔁 Full Axios error:", error);
        toast.error(error?.response?.data?.message || "Failed to delete address");
        dispatch({type: "IS_ERROR", payload: null});
    } finally {
        setOpenDeleteModal(false);
    }

}

export const clearCheckoutAddress = () => {
    return {
        type: 'REMOVE_CHECKOUT_ADDRESS',
    }
}


export const addPaymentMethod = (method) => {
    return {
        type: 'ADD_PAYMENT_METHOD',
        payload: method
    }
}

export const createUserCart = (sendCartItems) => async (dispatch, getState) => {
    try {
        dispatch({type: 'IS_FETCHING'});
        await api.post('/cart/create', sendCartItems);
        await dispatch(getUserCart());

    } catch (error) {
        console.error("❌ POST /carts failed:");
        console.error("⛔ Error message:", error?.message);
        console.error("📨 error.response:", error?.response);
        console.error("📄 error.response.data:", error?.response?.data);
        console.error("🔁 Full Axios error:", error);
    }
} 


export const getUserCart = () => async (dispatch, getState) => {
    try{
        dispatch({type: 'IS_FETCHING'});
        const {data} = await api.get("/carts/users/cart");   
        dispatch({
            type: 'GET_USER_CART_PRODUCTS', 
            payload: data.products,
            totalPrice: data.totalPrice,
            cartId: data.cartId,
        });

        localStorage.setItem('cartItems', JSON.stringify(getState().carts.cart));
        dispatch({type: 'IS_SUCCESS'});

    } catch (error) {
        console.error("❌ GET /carts/users/cart failed:");
        console.error("⛔ Error message:", error?.message);
        console.error("📨 error.response:", error?.response);
        console.error("📄 error.response.data:", error?.response?.data);
        console.error("🔁 Full Axios error:", error);
    }
}

import toast from 'react-hot-toast';

export const createStripePaymentSecret = (sendData) => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        
        console.log("🔍 Sending payment data:", sendData);
        
        const { data } = await api.post("/order/stripe-client-secret", sendData);
        
        console.log("✅ Payment secret created:", data);
        
        dispatch({ type: "CLIENT_SECRET", payload: data });
        localStorage.setItem("client-secret", JSON.stringify(data));
        dispatch({ type: "IS_SUCCESS" });
        
        return data;
        
    } catch (error) {
        console.error("❌ Failed to create client secret:", error);
        toast.error(error?.response?.data?.message || "Failed to create client secret");
        
        dispatch({
            type: 'SET_ERROR',
            payload: error?.response?.data?.message || error?.message || 'Failed to create payment'
        });
        
        dispatch({ type: 'IS_ERROR' });
        throw error;
    }
};

export const stripePaymentConfirmation = (sendData, setErrorMessage, setLoading, toast) => async (dispatch, getState) => {
    console.log("📦 Creating order with data:", sendData);
    
    try {
        dispatch({ type: 'IS_FETCHING' });
        
        // Create order via API - note the endpoint change to match the working example
        const response = await api.post("/order/users/payments/Stripe", sendData);
        
        console.log("✅ Order created successfully:", response.data);
        
        if (response.data) {
            // Clear storage
            localStorage.removeItem("CHECKOUT_ADDRESS");
            localStorage.removeItem("cartItems");
            localStorage.removeItem("client-secret");
            
            // Update Redux state
            dispatch({ type: "REMOVE_CLIENT_SECRET_ADDRESS" });
            dispatch({ type: "CLEAR_CART" });
            dispatch({ type: 'IS_SUCCESS' });
            
            toast.success("Order Accepted");
            
            return response.data;
        } else {
            setErrorMessage("Payment Failed. Please try again.");
            return null;
        }
        
    } catch (error) {
        console.error("❌ Failed to create order:", error);
        
        const errorMsg = error?.response?.data?.message || 
                        error?.message || 
                        'Payment Failed. Please try again.';
        
        setErrorMessage(errorMsg);
        toast.error(errorMsg);
        
        dispatch({
            type: 'SET_ERROR',
            payload: errorMsg
        });
        
        dispatch({ type: 'IS_ERROR' });
        
        return null;
    }
};

export const analyticsAction = () => async (dispatch, getState) => {
        try {
            dispatch({ type: "IS_FETCHING"});
            const { data } = await api.get('/admin/app/analytics');
            dispatch({
                type: "FETCH_ANALYTICS",
                payload: data,
            })
            dispatch({ type: "IS_SUCCESS"});
        } catch (error) {
            dispatch({ 
                type: "IS_ERROR",
                payload: error?.response?.data?.message || "Failed to fetch analytics data",
            });
        }
};

export const getOrdersForDashboard = (queryString, isAdmin) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const endpoint = isAdmin ? "/admin/orders" : "/seller/orders";
        const { data } = await api.get(`${endpoint}?${queryString}`);
        dispatch({
            type: "GET_ADMIN_ORDERS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch orders data",
         });
    }
};

export const updateOrderStatusFromDashboard =
     (orderId, orderStatus, toast, setLoader, isAdmin) => async (dispatch, getState) => {
    try {
        setLoader(true);
        const endpoint = isAdmin ? "/admin/orders/" : "/seller/orders/";
        const { data } = await api.put(`${endpoint}${orderId}/status`, { status: orderStatus});
        toast.success(data.message || "Order updated successfully");
        //await dispatch(getOrdersForDashboard());
        const queryString = window.location.search.slice(1);
        await dispatch(getOrdersForDashboard(queryString, isAdmin));
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
        setLoader(false)
    }
};


// i want to debug this function to see everything i get:
export const dashboardProductsAction = (queryString, isAdmin) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const endpoint = isAdmin ? "/admin/products" : "/seller/products";
        console.log("is Admin:", isAdmin);
        const { data } = await api.get(`${endpoint}?${queryString}`);
        // Debug: log the entire response data
        console.log("Dashboard Products API response:", data);

        dispatch({
            type: "FETCH_PRODUCTS_SUCCESS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log("Dashboard Products API error:", error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch dashboard products",
        });
    }
};

export const updateProductFromDashboard = 
    (sendData, toast, reset, setLoader, setOpen, isAdmin) => async (dispatch) => {
    try {
        setLoader(true);
        const endpoint = isAdmin ? "/admin/products/" : "/seller/products/";

        //debug the product:
        console.log("productId" + sendData.productId + " , " + JSON.stringify(sendData));



        await api.put(`${endpoint}${sendData.productId}`, sendData);
        toast.success("Product update successful");
        reset();
        setLoader(false);
        setOpen(false);

    await dispatch(dashboardProductsAction());
    } catch (error) {
    toast.error(error?.response?.data?.message || "Product update failed");
    }

};

export const addNewProductFromDashboard = 
    (sendData, toast, reset, setLoader, setOpen, isAdmin) => async(dispatch, getState) => {
        try {
            setLoader(true);
            const endpoint = isAdmin ? "/admin/categories/" : "/seller/categories/";
            await api.post(`${endpoint}${sendData.categoryId}/product`,
                sendData
            );
            toast.success("Product created successfully");
            reset();
            setOpen(false);


        await dispatch(dashboardProductsAction());
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Product creation failed");
        } finally {
            setLoader(false);
        }

};


export const deleteProduct = 
    (setLoader, productId, toast, setOpenDeleteModal, isAdmin) => async (dispatch, getState) => {
    try {
        setLoader(true)
        const endpoint = isAdmin ? "/admin/products/" : "/seller/products/";
        console.log(endpoint);
        console.log(productId);
        await api.delete(`${endpoint}${productId}`);
        toast.success("Product deleted successfully");
        setLoader(false);
        setOpenDeleteModal(false);
        //await dispatch(dashboardProductsAction());
        await dispatch(dashboardProductsAction());
    } catch (error) {
        console.log(error);
        toast.error(
            error?.response?.data?.message || "Some Error Occured"
        )
    }
};


export const updateProductImageFromDashboard = 
    (formData, productId, toast, setLoader, setOpen, isAdmin) => async (dispatch) => {
    try {
        setLoader(true);
        const endpoint = isAdmin ? "/admin/products/" : "/seller/products/";
        const response = await api.put(`${endpoint}${productId}/image`, formData); // ✅ שמור את response
        
        // עדכן את התמונה בעגלה אם המוצר קיים שם
        if (response.data && response.data.image) {
            dispatch(updateCartItemImage(productId, response.data.image));
        }
        
        toast.success("Image upload successful");
        setLoader(false);
        setOpen(false);
        await dispatch(dashboardProductsAction());
    } catch (error) {
        toast.error(error?.response?.data?.description || "Product Image upload failed");
        setLoader(false); // ✅ הוסף גם כאן
    }
};

export const updateCartItemImage = (productId, newImage) => ({
    type: 'UPDATE_CART_ITEM_IMAGE',
    payload: { productId, newImage }
});

export const getAllCategoriesDashboard = (queryString) => async (dispatch) => {
  dispatch({ type: "CATEGORY_LOADER" });
  try {
    const { data } = await api.get(`/public/categories?${queryString}`);
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data["content"],
      pageNumber: data["pageNumber"],
      pageSize: data["pageSize"],
      totalElements: data["totalElements"],
      totalPages: data["totalPages"],
      lastPage: data["lastPage"],
    });

    dispatch({ type: "CATEGORY_SUCCESS" });
  } catch (err) {
    console.log(err);

    dispatch({
      type: "IS_ERROR",
      payload: err?.response?.data?.message || "Failed to fetch categories",
    });
  }
};

export const createCategoryDashboardAction =
  (sendData, setOpen, reset, toast) => async (dispatch, getState) => {
    try {
      dispatch({ type: "CATEGORY_LOADER" });
      await api.post("/admin/categories", sendData);
      dispatch({ type: "CATEGORY_SUCCESS" });
      reset();
      toast.success("Category Created Successful");
      setOpen(false);
      await dispatch(getAllCategoriesDashboard());
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.categoryName || "Failed to create new category"
      );

      dispatch({
        type: "IS_ERROR",
        payload: err?.response?.data?.message || "Internal Server Error",
      });
    }
  };

export const updateCategoryDashboardAction =
  (sendData, setOpen, categoryID, reset, toast) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: "CATEGORY_LOADER" });

      await api.put(`/admin/categories/${categoryID}`, sendData);

      dispatch({ type: "CATEGORY_SUCCESS" });

      reset();
      toast.success("Category Update Successful");
      setOpen(false);
      await dispatch(getAllCategoriesDashboard());
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.categoryName || "Failed to update category"
      );

      dispatch({
        type: "IS_ERROR",
        payload: err?.response?.data?.message || "Internal Server Error",
      });
    }
  };

export const deleteCategoryDashboardAction =
  (setOpen, categoryID, toast) => async (dispatch, getState) => {
    try {
      dispatch({ type: "CATEGORY_LOADER" });

      await api.delete(`/admin/categories/${categoryID}`);

      dispatch({ type: "CATEGORY_SUCCESS" });

      toast.success("Category Delete Successful");
      setOpen(false);
      await dispatch(getAllCategoriesDashboard());
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to delete category");
      dispatch({
        type: "IS_ERROR",
        payload: err?.response?.data?.message || "Internal Server Error",
      });
    }
  };



export const getAllSellersDashboard =
(queryString) => async (dispatch, getState) => {
const { user } = getState().auth;

try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/auth/sellers?${queryString}`);
    dispatch({
    type: "GET_SELLERS",
    payload: data["content"],
    pageNumber: data["pageNumber"],
    pageSize: data["pageSize"],
    totalElements: data["totalElements"],
    totalPages: data["totalPages"],
    lastPage: data["lastPage"],
    });

    dispatch({ type: "IS_SUCCESS" });
} catch (err) {
    console.log(err);
    dispatch({
    type: "IS_ERROR",
    payload: err?.response?.data?.message || "Failed to fetch sellers data",
    });
}
};

export const addNewDashboardSeller =
(sendData, toast, reset, setOpen, setLoader) => async (dispatch) => {
    try {
        setLoader(true);
        await api.post("/auth/signup", sendData);
        reset();
        toast.success("Seller registered successfully!");

        await dispatch(getAllSellersDashboard());
    } catch (err) {
        console.log(err);
        toast.error(
        err?.response?.data?.message ||
            err?.response?.data?.password ||
            "Internal Server Error"
        );
    } finally {
        setLoader(false);
        setOpen(false);
    }
};
