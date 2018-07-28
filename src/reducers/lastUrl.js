import { LAST_URL } from "../constants";

export const urlReducer = (state=null,action) => {
    switch (action.type) {
        case LAST_URL:
            return action.last_url;
    
        default:
            return state;
    }
}