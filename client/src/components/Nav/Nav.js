import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import logo from "./logo.png"
import '../../SASS/Main.scss'
import Search from '../Search/Search';


export default class Nav extends Component {
    render() {
        return (
            <nav className="nav">
                
                <Link to={"/"}><img src={logo} alt="logo"/></Link>
                
                <Search/>

                <div>
                <Link to={"/signup"}>Signup</Link>
                <Link to={"/login"}>Login</Link>
                </div>
            </nav>
        )
    }
}
