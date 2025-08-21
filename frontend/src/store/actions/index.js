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
    const {user} = getState().auth;

    console.log("📦 addAddressHandler: start");
    console.log("📦 Data to send:", sendData);

    try {

        // debug porpuse:
        const sendDataDebug = {
            "country": "USA2",
            "city": "San Francisco",
            "street": "Market Street",
            "zipCode": "94103",
            "buildingName": "Bay Apartments",
            "state": "California"
        }

        console.log("debugging: ", sendData)

        const {data} = await api.post("/addresses", sendData);
        toast.success("Address added successfully");
        dispatch({type: "IS_SUCCESS"});
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