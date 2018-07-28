import React,{ Component } from 'react';
import axios from 'axios';

import MusicItemList from "../components/MusicItemList";
import ArtistItemList from "../components/ArtistItemList";

import { API_URL } from "../constants";

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            albums: [],
            artists: [],
            nextAlbums: null,
            prevAlbums: null,
            nextArtists: null,
            prevArtists: null
        }
    }
    onInputChange(e){
        if(e.target.value === ''){
            this.setState({
                albums: [],
                artists: [],
                nextAlbums: null,
                prevAlbums: null,
                nextArtists: null,
                prevArtists: null
            });
        }
        else{
            axios.get(`${API_URL}search?q=${e.target.value}&type=album,artist`)
                .then(response => {
                    this.setState({
                        albums: response.data.albums.items,
                        artists: response.data.artists.items,
                        nextAlbums: response.data.albums.next,
                        prevAlbums: response.data.albums.previous,
                        nextArtists: response.data.artists.next,
                        prevArtists: response.data.artists.previous
                    });
                })
        }
    }
    getNextArtists(){
        axios.get(this.state.nextArtists)
            .then(response => {
                this.setState({
                    artists: response.data.artists.items,
                    nextArtists: response.data.artists.next,
                    prevArtists: response.data.artists.previous
                });
            })
    }
    getPrevArtists(){
        axios.get(this.state.prevArtists)
            .then(response => {
                this.setState({
                    artists: response.data.artists.items,
                    nextArtists: response.data.artists.next,
                    prevArtists: response.data.artists.previous
                });
            })
    }
    getNextAlbums(){
        axios.get(this.state.nextAlbums)
            .then(response => {
                this.setState({
                    albums: response.data.albums.items,
                    nextAlbums: response.data.albums.next,
                    prevAlbums: response.data.albums.previous
                });
            })
    }
    getPrevAlbums(){
        axios.get(this.state.prevAlbums)
            .then(response => {
                this.setState({
                    albums: response.data.albums.items,
                    nextAlbums: response.data.albums.next,
                    prevAlbums: response.data.albums.previous
                });
            })
    }
    render(){
        return(
            <div className="search dashboard">
                <input placeholder="Search for Artists, Albums, etc..." type="text" className="search__input" onChange={e => {this.onInputChange(e)}} />
                <div className="search__results">
                    {this.state.artists.length > 0 ? (<div>
                        <h2>Artists</h2>
                        <ArtistItemList artists={this.state.artists} />
                        <div className="search__pagination">
                            {this.state.prevArtists && <a className="search__pagination_btn" onClick={() => { this.getPrevArtists() }}>Previous</a>}
                            {this.state.nextArtists && <a className="search__pagination_btn" onClick={() => { this.getNextArtists() }}>Next</a>}
                        </div>
                        
                    </div>): ''}
                    {this.state.albums.length > 0 ? (<div>
                        <h2>Music</h2>
                        <MusicItemList items={this.state.albums} />
                        <div className="search__pagination">
                            {this.state.prevArtists && <a className="search__pagination_btn" onClick={() => { this.getPrevArtists() }}>Previous</a>}
                            {this.state.nextArtists && <a className="search__pagination_btn" onClick={() => { this.getNextArtists() }}>Next</a>}
                        </div>
                    </div>): ''}
                </div>
            </div>
        )
    }
}

export default Search;