import React,{ Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { API_URL } from '../constants';

import MusicItemList from '../components/MusicItemList';

import { lastUrl } from "../actions";

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            albums: []
        }
    }
    componentDidMount(){
        this.props.lastUrl(this.props.location.pathname);
        axios.get(`${API_URL}browse/new-releases`)
        .then(response => {
            this.setState({
                albums: response.data.albums.items
            })
        })
    }
    render(){
        if(!this.props.authenticated){
            return(
                <Redirect to="/"/>
            )
        }
        return(
            <div className="dashboard">
                <h1>New Releases</h1>
                <MusicItemList items={this.state.albums} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.status.authenticated
    }
}

export default connect(mapStateToProps,{lastUrl})(Dashboard);