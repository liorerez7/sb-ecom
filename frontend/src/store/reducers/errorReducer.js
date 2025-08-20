const initialState = {
    isLoading: false,
    errorMessage: null,
    categoryLoader: false,
    categoryErrorMessage: null,
    btnLoader: false

};

export const errorReducer = (state = initialState, action) => {
  switch(action.type) {
        case 'IS_FETCHING':
          return {
              ...state,
              isLoading: true,
              errorMessage: null,
          };
        case 'IS_SUCCESS':
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
            };
        case 'IS_ERROR':
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            };
        case 'CATEGORY_SUCCESS':
            return {
                ...state,
                categoryLoader: false,
                categoryErrorMessage: null,
            };
        case 'CATEGORY_LOADER':
            return {
                ...state,
                categoryLoader: true,
                categoryErrorMessage: null,
            };
        case 'BUTTON_LOADER':
          return {
              ...state,
              btnLoader: true,
              errorMessage: null,
              categoryLoader: null,
          };
        
        default:
            return state;
    }
};