const initialState = {
    user: null,
    isAuthenticated: false,
    authChecked: false,
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
        case 'REGISTER_REQUEST':
        case 'GOOGLE_LOGIN_REQUEST':
        case 'USER_PROFILE_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
        case 'GOOGLE_LOGIN_SUCCESS':
        case 'USER_PROFILE_SUCCESS':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                authChecked: true,
                loading: false,
                error: null,
            };
        case 'LOGIN_FAIL':
        case 'REGISTER_FAIL':
        case 'GOOGLE_LOGIN_FAIL':
        case 'USER_PROFILE_FAIL':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                authChecked: true,
                loading: false,
                error: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default authReducer;
