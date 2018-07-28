import axios from 'axios';

import { API_URL,OPEN_APP,LOGOUT } from "../constants";

export const openApp = token => {
    return dispatch => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.get(`${API_URL}me`)
        .then(response => {
            dispatch({
                type: OPEN_APP,
                authenticated: true,
                user: response.data
            });
        });
        
    }
}

export const logOut = () => {
    return dispatch => {
        delete axios.defaults.headers.common['Authorization'];
        dispatch({
            type: LOGOUT,
            authenticated: false,
            user: {}
        });
    }
}