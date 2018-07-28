import { GET_PLAYLIST,PLAY_TRACK,PAUSE_TRACK } from "../constants";

export const playlistReducer = (state=[],action) => {
    switch (action.type) {
        case GET_PLAYLIST:
            return action.playlist;
    
        default:
            return state;
    }
}

const initialTrack = {
    track: {},
    playing: false
};

export const playerReducer = (state=initialTrack,action) => {
    switch (action.type) {
        case PLAY_TRACK:
            return {
                track: action.track,
                playing: action.playing
            };
        
        case PAUSE_TRACK:
            return {
                ...state,
                playing: action.playing
            };
    
        default:
            return state;
    }
}