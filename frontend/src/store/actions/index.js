import api from '../../api/api';

export const fetchProducts = () => async (dispatch) => {
    try {
        const { data } = await api.get('/public/products');
        dispatch({ 
            type: 'FETCH_PRODUCTS_SUCCESS',
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
         });
         
    } catch (error) {
        dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
    }
};