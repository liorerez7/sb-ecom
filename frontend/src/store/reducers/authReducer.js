const initialState = {
    user: null,
    address: [],
}

export const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'LOGIN_USER':
            return {...state, user: action.payload};

        case 'USER_ADDRESSES':
            return {...state, address: action.payload};

        case 'LOGOUT_USER':
            return {user: null, address: []};

        default:
            return state

    }
};