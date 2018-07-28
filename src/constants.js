export const client_id = '2092c7a60fcf4ee0b417ef374f9cf52d';
export const client_secret = '8053299b25d644b49eca90e03f113447';
export const OPEN_APP = 'OPEN_APP';
export const LOGOUT = 'LOGOUT';
export const LAST_URL = 'LAST_URL';
export const GET_PLAYLIST = 'GET_PLAYLIST';
export const PLAY_TRACK = 'PLAY_TRACK';
export const PAUSE_TRACK = 'PAUSE_TRACK';
export const API_URL = 'https://api.spotify.com/v1/';

export const serialize = obj => {
    let str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

export const getArtists = artists => {
    return artists.reduce((artistString, artist, i) => {
        let comma = i > 0 ? ', ' : '';
        if(comma.length){
            return [...artistString, comma, artist];
        }
        else{
            return [...artistString,artist];
        }
    }, []);
}

export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

