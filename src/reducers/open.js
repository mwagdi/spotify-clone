import { OPEN_APP,LOGOUT } from "../constants";

const initialState = {
    authenticated: false,
    user: {}
}

export const openReducer = (state=initialState,action) => {
    switch (action.type) {
        case OPEN_APP:
            return {
                ...state,
                authenticated: action.authenticated,
                user: action.user
            }
        case LOGOUT:
            return {
                ...state,
                authenticated: action.authenticated,
                user: action.user
            }
    
        default:
            return state;
    }
}