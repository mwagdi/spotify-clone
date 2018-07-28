import React,{ Component } from 'react';
import { BrowserRouter,Route,Switch,Redirect } from "react-router-dom";
import Login from "../routes/Login";
import Dashboard from '../routes/Dashboard';
import Songs from '../routes/Songs';
import Callback from '../routes/Callback';
import Album from "../routes/Album";
import Artist from "../routes/Artist";
import Search from '../routes/Search';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Sidebar from "../components/Sidebar";
import ReactPlayer from "react-player";

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route
//         {...rest}
//         render={props =>
//             fakeAuth.isAuthenticated ? (
//                 <Component {...props} />
//             ) : (
//                     <Redirect
//                         to={{
//                             pathname: "/login",
//                             state: { from: props.location }
//                         }}
//                     />
//                 )
//         }
//     />
// );

class Router extends Component{
    render(){
        return (                
                <BrowserRouter>
                    <div className="container">
                        {this.props.status.authenticated ? (<Sidebar user={this.props.status.user} />) : ''}
                        <Switch>
                            <Route exact path="/" component={Login} />
                            <Route path="/dashboard" component={Dashboard} />
                            <Route path="/library" component={Songs} />
                            <Route path="/callback" component={Callback} />
                            <Route path="/albums/:id" component={Album} />
                            <Route path="/songs/:id" component={Album} />
                            <Route path="/artists/:id" component={Artist} />
                            <Route path="/search" component={Search} />
                        </Switch>
                    </div>
                </BrowserRouter>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.status
    }
}

export default connect(mapStateToProps,{})(Router);