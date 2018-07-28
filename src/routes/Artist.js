import React,{ Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Tracks from "../components/Tracks";
import MusicItemList from "../components/MusicItemList";

import { lastUrl } from "../actions";

import { API_URL,numberWithCommas } from '../constants';

class Artist extends Component{
    constructor(props){
        super(props);
        this.state = {
            artist: {},
            tracks: [],
            albums: []
        }
    }
    componentDidMount() {
        this.props.lastUrl(this.props.location.pathname);
        axios.get(`${API_URL}artists/${this.props.match.params.id}`)
        .then(response => {
            this.setState({artist: response.data});
        })
        .then(()=>{
            axios.get(`${API_URL}artists/${this.props.match.params.id}/top-tracks?country=US`)
            .then(response => {
                this.setState({tracks: response.data.tracks});
            })
        })
        .then(() => {
            axios.get(`${API_URL}artists/${this.props.match.params.id}/albums`)
                .then(response => {
                    this.setState({ albums: response.data.items.filter((album,i) => album.album_type==='album') });
                })
        })
    }
    
    render(){
        if (!this.props.authenticated) {
            return (
                <Redirect to="/" />
            )
        }
        return(
            <div className="artist">
                <div className="artist__top" style={{ backgroundImage: `url(${this.state.artist.images?this.state.artist.images[0].url:''})`}}>
                    <h1 className="artist__name">{this.state.artist.name}</h1>
                    {this.state.artist.followers &&
                    <h3 className="artist__followers">{numberWithCommas(this.state.artist.followers.total)} followers</h3>}
                    {this.state.artist.genres &&
                    <h3 className="artist__genres">
                        {this.state.artist.genres.map((genre,i)=>{
                            let genreString = i>0? `, ${genre}`: genre;
                            return <span key={i}>{genreString}</span>
                        })}
                    </h3>}
                </div>
                <div className="artist__material">
                    <div className="artist__tracks">
                        <h2>Top Tracks</h2>
                        <Tracks tracks={this.state.tracks} />
                    </div>
                    <div className="artist__albums">
                        <h2>Albums</h2>
                        <MusicItemList items={this.state.albums} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.status.authenticated
    }
}

export default connect(mapStateToProps,{ lastUrl })(Artist);