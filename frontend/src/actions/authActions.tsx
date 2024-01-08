export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

interface LoginAction {
    type: typeof LOGIN_USER;
    payload: { user: any; token: string;}
}

interface LogoutAction {
    type: typeof LOGOUT_USER;
}

export type AuthActionTypes = LoginAction | LogoutAction;

export const loginUser = (user: any, token: string): AuthActionTypes => ({
    type: LOGIN_USER,
    payload: { user, token },
})

export const logoutUser = () : AuthActionTypes => ({
    type: LOGOUT_USER,
})