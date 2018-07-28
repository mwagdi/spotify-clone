import { combineReducers } from "redux";

import { openReducer } from "./open";
import { urlReducer } from "./lastUrl";
import { playlistReducer,playerReducer } from "./play";

export default combineReducers({
    status: openReducer,
    last_url: urlReducer,
    playlist: playlistReducer,
    current_track: playerReducer
});