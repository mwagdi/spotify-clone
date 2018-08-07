import React,{ Component } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';

import { playTrack,pauseTrack } from '../actions/player';
import { getArtists } from "../constants";

const getTime = s => {
    const time = s / 60;
    const minutes = Math.floor(time);
    const seconds = Math.floor((time - minutes) * 60);
    const secondsString = seconds<10? `0${seconds}` : seconds;
    return `${minutes}:${secondsString}`;
}

class ThePlayer extends Component{
    constructor(props){
        super(props);
        this.state = {
            ...props.current_track,
            progress: 0,
            disablePrev: true,
            disableNext: false
        };
    }
    componentWillReceiveProps(nextProps){
        const playlist = nextProps.playlist;
        const track = nextProps.current_track.track;
        this.setState({
            ...nextProps.current_track,
            progress: this.state.track!==track? 0 : this.state.progress,
            disablePrev: playlist.indexOf(track) == 0,
            disableNext: playlist.indexOf(track) == playlist.length - 1
        });
    }
    togglePlay(){
        if(this.state.playing){
            this.props.pauseTrack();
        }
        else{
            this.props.playTrack(this.state.track);
        }
    }
    toSeek(pos,total){
        const jump = pos / total;
        this.setState({progress: jump*100});
        this.player.seekTo(jump);
    }
    browsing(pos,total){
        this.setState({ browsing: pos / total });
    }
    nextTrack(){
        if(!this.state.disableNext){
            const trackIndex = this.props.playlist.indexOf(this.state.track);
            this.props.playTrack(this.props.playlist[trackIndex + 1]);
        }
    }
    prevTrack(){
        if(!this.state.disablePrev){
            const trackIndex = this.props.playlist.indexOf(this.state.track);
            this.props.playTrack(this.props.playlist[trackIndex - 1]);
        }
    }
    onEnd(){
        if (!this.state.disableNext) {
            this.nextTrack();
        }
        else{
            this.setState({
                playing: false,
                progress: 0
            });
            this.player.seekTo(0);
        }
    }
    ref = player => {
        this.player = player
    }
    startDrag(e){
        if(this.state.dragged && this.state.dragPos){
            let diff = e.clientX - this.state.dragPos;
            if(diff>0){
                this.setState({
                    dragPos: e.clientX,
                    volume: diff / 125
                })
            }
        }
    }
    render(){
        if(!this.state.track.preview_url){
            return(
                ''
            )
        }
        let artists = getArtists(this.state.track.artists);
        return(
            <div onMouseUp={(e) => { this.setState({ dragged: false }) }} onMouseMove={e => {this.startDrag(e)}} className="player">
                <div className="player__bar" onClick={e => { this.toSeek(e.clientX, window.innerWidth) }} onMouseMove={e => { this.browsing(e.clientX, window.innerWidth)}} onMouseOut={e => { this.setState({browsing:false}) }}>
                    <div className="player__played" style={{width: `${this.state.progress}%`}}></div>
                    {this.state.browsing &&
                        <div style={{left: `${this.state.browsing*100}%`}} className="player__browse">
                        <span>{getTime(this.state.browsing*this.state.time)}</span>    
                        </div>}
                </div>
                <div className="player__song">
                    {this.state.track.album && this.state.track.album.images && 
                        <div className="player__song_thumb" style={{ backgroundImage: `url(${this.state.track.album.images[0].url})` }}></div>}
                    <p className="player__song_info">
                        <span className="player__song_name">{this.state.track.name}</span>
                        <span className="player__song_artist">
                            {artists.map((artist,i) => {
                                return artist.name ? (
                                    <span key={i}>{artist.name}</span>
                                ):artist
                            })}
                        </span>
                    </p>
                </div>
                <div className="player__buttons">
                    <a className={`player__btn ${this.state.disablePrev ? 'disabled' : ''}`} onClick={() => { this.prevTrack() }}>
                        <i className="icon-prev"></i>
                    </a>
                    <a onClick={() => { this.togglePlay() }} className={`play-pause player__btn ${this.state.playing ? 'active':''}`}>
                        {this.state.playing ? (<i className="icon-pause"></i>) : (<i className="icon-play"></i>)}
                    </a>
                    <a className={`player__btn ${this.state.disableNext? 'disabled':''}`} onClick={() => {this.nextTrack()}}>
                        <i className="icon-next"></i>
                    </a>
                </div>
                <ReactPlayer 
                ref={this.ref} 
                onProgress={(e)=>{this.setState({progress: e.played*100,time:e.loadedSeconds});}}
                onEnded={()=>{this.onEnd()}}
                url={this.state.track.preview_url} 
                playing={this.state.playing}
                width="0"
                height="0"
                >
                </ReactPlayer>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        playlist: state.playlist,
        current_track: state.current_track
    }
}

export default connect(mapStateToProps,{playTrack,pauseTrack})(ThePlayer);