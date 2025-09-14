const initialState = {
    cart : [],
    totalPrice: 0,
    cartId: null,
};

export const cartReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case 'ADD_TO_CART':
            const productToAdd = action.payload;
            const existingProduct = state.cart.find((item) => item.productId === productToAdd.productId);

            if(existingProduct) {
                const updatedCart = state.cart.map((item) => {
                    if(item.productId === productToAdd.productId) {
                        return productToAdd
                    }
                    return item;
                });
                     

                return {
                    ...state,
                    cart: updatedCart,
                }
            }
            else{
                const newCart = [...state.cart, productToAdd];
                return {
                    ...state,
                    cart: newCart,
                }
            }
        case 'REMOVE_FROM_CART':
            const productToRemove = action.payload;
            const updatedCart = state.cart.filter((item) => item.productId !== productToRemove.productId);
            return {
                ...state,
                cart: updatedCart,
            }

        case 'GET_USER_CART_PRODUCTS':
            return {...state, cart: action.payload, totalPrice: action.totalPrice, cartId: action.cartId};

        case 'CLEAR_CART':
            return {...state, cart: [], totalPrice: 0, cartId: null};

        case 'UPDATE_CART_ITEM_IMAGE':
            console.log('Updating cart item image:', action.payload);
            return {
                ...state,
                cart: state.cart.map(item => 
                    item.productId === action.payload.productId 
                        ? { ...item, image: action.payload.newImage }
                        : item
                )
            };

        default:
            return state


    }


};