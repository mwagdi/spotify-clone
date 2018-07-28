import { LAST_URL } from "../constants";

export const lastUrl = url => {
    return dispatch => {
        dispatch({
            type: LAST_URL,
            last_url: url
        })
    }
}