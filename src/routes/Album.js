import React,{ Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { Redirect,Link } from "react-router-dom";

import Tracks from '../components/Tracks';

import { API_URL,getArtists } from "../constants";
import { lastUrl } from "../actions";

class Album extends Component{
    constructor(props,match){
        super(props);
        this.state = {
            album: {}
        }
    }
    componentDidMount(){
        this.props.lastUrl(this.props.location.pathname);
        axios.get(`${API_URL}albums/${this.props.match.params.id}`)
        .then(response => {
            this.setState({album: response.data});
            console.log(response.data.images[0])
        });
    }
    
    render(props){
        if (!this.props.authenticated) {
            return (
                <Redirect to="/" />
            )
        }
        let artists = this.state.album.artists? getArtists(this.state.album.artists):[];
        return(
            <div className="dashboard">
                <div className="album">
                    <div className="album__info">
                        {this.state.album.images && this.state.album.images.length &&
                        <img src={this.state.album.images[0].url} alt="album cover" className="album__image"/>}
                        <h2 className="album__title">{this.state.album.name}</h2>
                        {this.state.album.artists &&
                        <h3 className="album__artists">
                            {artists.map((artist, i) => {
                                return artist.name ? (
                                    <Link to={`/artists/${artist.id}`} key={i}>{artist.name}</Link>
                                ) : artist
                            })}    
                        </h3>}
                    </div>
                    <div className="album__tracks">
                        {this.state.album.tracks && 
                            <Tracks tracks={this.state.album.tracks.items} />}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.status.authenticated
    }
}

export default connect(mapStateToProps,{ lastUrl })(Album);