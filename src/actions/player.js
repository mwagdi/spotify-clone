import { GET_PLAYLIST,PLAY_TRACK,PAUSE_TRACK } from "../constants";

export const getPlaylist = playlist => {
    return dispatch => {
        const playable = playlist.filter(p => p.preview_url);
        dispatch({
            type: GET_PLAYLIST,
            playlist: playable
        });
    }
}

export const playTrack = track => {
    return dispatch => {
        dispatch({
            type: PLAY_TRACK,
            track,
            playing: true
        })
    }
}
export const pauseTrack = () => {
    return dispatch => {
        dispatch({
            type: PAUSE_TRACK,
            playing: false
        })
    }
}