import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import Router from "./components/Router";
import ThePlayer from "./components/ThePlayer";
import './assets/css/App.css';
import { openApp } from "./actions";

class App extends Component {
  componentDidMount() {
    const access_token = localStorage.getItem('access_token');
    if(access_token){
      const now = new Date;
      const expires_on = new Date(localStorage.getItem('expires_on'));
      if(now>expires_on){
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_on');
      }
      else{
        this.props.openApp(access_token);
      }
    }
  }
  render() {
    return (
      <div className="App">
        <Router />
        <ThePlayer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.status
  }
}

export default connect(mapStateToProps,{openApp})(App);
