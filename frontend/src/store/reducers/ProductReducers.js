const initialState = {
  products: null,
  categories: null,
  pagination: {},
};

export const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_PRODUCTS_SUCCESS':
            return {
                ...state,
                products: action.payload,
                pagination: {
                    pageNumber: action.pageNumber,
                    pageSize: action.pageSize,
                    totalElements: action.totalElements,
                    totalPages: action.totalPages,
                    lastPage: action.lastPage,
                },
            };
        case 'FETCH_PRODUCTS_FAILURE':
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};