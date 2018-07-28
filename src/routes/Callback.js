import React,{ Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { openApp } from "../actions";

class Callback extends Component{
    componentDidMount() {
        const home = `${window.location.origin}/callback`;

        const url = (window.location.href).split('/');
        const callback = url.find(string => string.includes("callback"));
        if (callback) {
            const code = window.location.hash.replace('#', '');
            const codeArray = code.split('&');
            const codeObject = codeArray.reduce((obj, el) => {
                let elArray = el.split('=');
                obj[elArray[0]] = elArray[1];
                return obj;
            }, {});
            localStorage.setItem('access_token', codeObject.access_token);
            let t = new Date();
            t.setSeconds(t.getSeconds() + codeObject.expires_in);
            localStorage.setItem('expires_on', t);
            this.props.openApp(codeObject.access_token);
        }
    }
    render(){
        if(this.props.status.authenticated){
            return (
                <Redirect to="/dashboard"/>
            )
        }
        return(
            <div>LOADING...</div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.status
    }
}

export default connect(mapStateToProps,{ openApp })(Callback);