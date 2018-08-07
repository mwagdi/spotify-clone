import React,{ Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logOut } from "../actions";

class Sidebar extends Component{
    constructor(props){
        super(props);
        this.state = {
            dropdown: false
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        console.log(document.querySelector('body').clientWidth)
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll(event) {
        let scrollTop = event.srcElement.body.scrollTop;
        // let height = document.getElementById('myDiv').clientHeight;
        // this.setState({
        //     fixed: 'itemTranslate'
        // });
    }
    render(){
        return(
            <div className="sidebar">
                <div className="sidebar__container">
                    <div className="sidebar__profile">
                        {this.props.user.images[0] &&
                            <div className="sidebar__avatar" style={{ backgroundImage: `url(${this.props.user.images[0].url})` }}></div>}
                        <h3 className="sidebar__name">{this.props.user.display_name}</h3>
                        <a onClick={()=>{this.props.logOut()}} className="logout">Log Out</a>
                    </div>
                    <div className="sidebar__nav sidebar__nav--large">
                        <Link className="sidebar__link" to="/dashboard">Home</Link>
                        <Link className="sidebar__link" to="/library">Your Songs</Link>
                        <Link className="sidebar__link" to="/search">Search</Link>
                    </div>
                    <div className="sidebar__responsive">
                        <div className="sidebar__responsive_left">
                            {this.props.user.images[0] &&
                                <div className="sidebar__avatar" style={{ backgroundImage: `url(${this.props.user.images[0].url})` }}></div>}
                            <a onClick={()=>{this.setState({dropdown: !this.state.dropdown})}} className="open-dropdown">{this.props.user.display_name} &#9660;</a>
                            <ul className={`sidebar__dropdown ${this.state.dropdown? "opened":""}`}>
                                <li>
                                    <Link className="sidebar__link" to="/dashboard">Home</Link>
                                </li>
                                <li>
                                    <Link className="sidebar__link" to="/library">Your Songs</Link>
                                </li>
                                <li>
                                    <Link className="sidebar__link" to="/search">Search</Link>
                                </li>
                            </ul>
                        </div>
                        <a onClick={() => { this.props.logOut() }}>Log Out</a>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default connect(null,{logOut})(Sidebar);