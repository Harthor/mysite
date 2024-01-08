import { LOGIN_USER, LOGOUT_USER, AuthActionTypes } from '../actions/authActions'

// 타입 정의
interface AuthState {
    isAuthenticated: boolean;
    user: any;
    token: string | null;
}

// 객체 정의
const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
}

const authReducer = (state = initialState, action: AuthActionTypes): AuthActionTypes => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
            };
        case LOGOUT_USER:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
            }
        default:
            return state;
    }
}

export default authReducer;