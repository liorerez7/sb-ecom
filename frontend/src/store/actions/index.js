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