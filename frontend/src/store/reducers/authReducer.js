const initialState = {
    user: null,
    address: [],
    clientSecret: null,
    selectedUserCheckoutAddress: null, 
}

export const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'LOGIN_USER':
            return {...state, user: action.payload};

        case 'USER_ADDRESSES':
            return {...state, address: action.payload};

        case 'LOGOUT_USER':
            return {user: null, address: []};

        case 'SELECT_CHECKOUT_ADDRESS':
            return {...state, selectedUserCheckoutAddress: action.payload};

        case 'REMOVE_CHECKOUT_ADDRESS':
            return {...state, selectedUserCheckoutAddress: null};

        case 'CLIENT_SECRET':
            return {...state, clientSecret: action.payload};

        case 'REMOVE_CLIENT_SECRET_ADDRESS':
            return {...state, clientSecret: null, selectedUserCheckoutAddress: null};

        default:
            return state

    }
};