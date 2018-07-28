import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from 'axios';

import Tracks from "../components/Tracks";

import { lastUrl } from "../actions";
import { API_URL } from "../constants";

class Songs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            next: null
        }
        this.handleScroll = this.handleScroll.bind(this);
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.props.lastUrl(this.props.location.pathname);
        axios.get(`${API_URL}me/tracks?limit=50`)
            .then(response => {
                const tracks = response.data.items.map((item, i) => item.track);
                this.setState({
                    tracks,
                    next: response.data.next
                });
            })
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll(e) {
        const body = document.querySelector('.dashboard');
        if (window.pageYOffset + window.innerHeight > body.scrollHeight - 100) {
            if (this.state.next) {
                axios.get(this.state.next)
                    .then(response => {
                        const tracks = response.data.items.map((item, i) => item.track);
                        this.setState({
                            tracks: [...this.state.tracks, ...tracks],
                            next: response.data.next
                        })
                    })
            }
        }

    }
    render() {
        if (!this.props.authenticated) {
            return (
                <Redirect to="/" />
            )
        }
        return (
            <div className="dashboard">
                <h1>Your Songs</h1>
                <Tracks tracks={this.state.tracks} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.status.authenticated,
        current_track: state.current_track
    }
}

export default connect(mapStateToProps, { lastUrl })(Songs);