import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';

import { getPlaylist,playTrack,pauseTrack } from "../actions";

class Tracks extends Component {
    constructor(props){
        super(props);
        this.state = {
            tracks: this.props.tracks
        }
    }
    playTrack(playlist,track){
        this.props.getPlaylist(playlist);
        this.props.playTrack(track);
    }
    render() {
        return (
            <ul className="tracklist">
                {this.props.tracks.map((track, i) => (
                    <li key={i} className={`tracklist__item ${this.props.current_track.track.id === track.id ? 'active' : ''}`}>
                        <div className="tracklist__item_play">
                            {track.preview_url ? (<a onClick={() => { this.playTrack(this.props.tracks, track) }}><i className="icon-play"></i></a>) : ''}
                        </div>
                        <div className="tracklist__item_name">{track.name}</div>
                        <div className="tracklist__item_artists">
                            {track.artists.map((artist, l) => (l > 0 ? `, ${artist.name}` : artist.name))}
                        </div>
                    </li>
                ))}
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        current_track: state.current_track
    }
}

export default connect(mapStateToProps, { getPlaylist,playTrack,pauseTrack })(Tracks);