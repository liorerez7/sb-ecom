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


export const addToCart = (data, qty = 1, toast) => (dispatch, getState) => {

    const {products} = getState().products;
    const getProduct = products.find((product) => product.productId === data.productId);
    const isQuantityExist = getProduct?.quantity >= qty;

    if(isQuantityExist){
        dispatch({type: 'ADD_TO_CART', payload: {...data, quantity: qty}});
        localStorage.setItem('cartItems', JSON.stringify(getState().carts.cart));
        toast.success(`${data.productName} added to cart`);
    } else{
        toast.error(`${data.productName} is out of stock`);
    }


};


export const increaseCartQuantity =
  (data, toast, currentQuantity, setCurrentQuantity) =>
  (dispatch, getState) => {
    const { products } = getState().products;
    const getProduct = products.find((p) => p.productId === data.productId);

    const nextQty = Number(currentQuantity ?? 0) + 1;
    const isQuantityExist = (getProduct?.quantity ?? 0) >= nextQty;

    if (isQuantityExist) {
      setCurrentQuantity(nextQty);
      dispatch({
        type: 'ADD_TO_CART',
        payload: { ...data, quantity: nextQty },
      });
      localStorage.setItem('cartItems', JSON.stringify(getState().carts.cart));
    } else {
      toast?.error?.(`${data.productName} is out of stock`);
    }
  };


  export const decreaseCartQuantity = 
    (data, newQuantity) => (dispatch, getState) => {
        dispatch({
            type: "ADD_TO_CART",
            payload: {...data, quantity: newQuantity},
        });
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart))}


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

export const logOutUser = (toast, navigate) => (dispatch) => {
    dispatch({type: 'LOGOUT_USER'});
    localStorage.removeItem('auth');
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


export const createStripePaymentSecret= (totalPrice) => async (dispatch, getState) => {
    try{
        dispatch({type: 'IS_FETCHING'});
        const {data} = await api.post("/order/stripe-client-secret", {
            "amount" : Number(totalPrice) * 100, 
            "currency": "usd"
        });   
        dispatch({
            type: 'CLIENT_SECRET', 
            payload: data,
        });
        dispatch({type: 'IS_SUCCESS'});

        localStorage.setItem("client-secret", JSON.stringify(data));

    } catch (error) {
        console.error("❌ POST /order/stripe-client-secret failed:");
        console.error("⛔ Error message:", error?.message);
        console.error("📨 error.response:", error?.response);
        console.error("📄 error.response.data:", error?.response?.data);
        console.error("🔁 Full Axios error:", error);
    }
}


export const stripePaymentConfirmation = (sendData, setErrorMessage, setLoading, toast) => async (dispatch, getState) => {
    try{
        dispatch({type: 'IS_FETCHING'});
        const { data } = await api.post("/order/users/payments/Stripe",sendData);   

        if(data){
            localStorage.removeItem('cartItems');
            localStorage.removeItem('client-secret');
            localStorage.removeItem('CHECKOUT_ADDRESS');
            
            dispatch({type: 'REMOVE_CLIENT_SECRET_ADDRESS'});
            dispatch({type: 'CLEAR CART'});
            toast.success("Payment Successful");
        }
        else{
            dispatch(setErrorMessage("Payment Failed"));
        }
    } catch (error) {
        console.error("❌ POST /order/users/payments/Stripe failed:");
        console.error("⛔ Error message:", error?.message);
        console.error("📨 error.response:", error?.response);
        console.error("📄 error.response.data:", error?.response?.data);
        console.error("🔁 Full Axios error:", error);
    }
}