import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import logo from '../assets/images/logo.png';

import { client_id,serialize } from "../constants";

class Login extends Component{
    redirectLogin(){
        const home = `${window.location.origin}/callback`;
        const queryObject = {
            client_id,
            response_type: 'token',
            redirect_uri: home,
            scope: 'user-library-read'
        }
        const queryString = `?${serialize(queryObject)}`;

        window.location.href = `https://accounts.spotify.com/authorize/${queryString}`;
    }
    render(){
        if(this.props.authenticated){
            if(this.props.last_url){
                return(
                    <Redirect to={this.props.last_url}/>
                )
            }
            else{
                return(
                    <Redirect to="/dashboard" />
                )
            }
        }
        return(
            <div className="login">
                <div className="login__container">
                    <div>
                        <img src={logo} alt="music icon"/>
                    </div>
                    <div className="btn-container">
                        <a onClick={()=>{this.redirectLogin()}} className="btn">Login</a>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.status.authenticated,
        last_url: state.last_url
    }
}

export default connect(mapStateToProps,{})(Login);