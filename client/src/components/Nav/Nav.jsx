import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";

export default class Nav extends Component {
  render() {
    if (this.props.userLogged) {
      return (
        <nav className="nav">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
          <div>
            

            <Link to={`/profile/${this.props.userLogged.username}`}>Profile</Link>
            <Link to={"/cart"}>Cart</Link>
          </div>
        </nav>
      );
    }

    return (
      <nav className="nav">
        <Link to={"/"}>
          <img src={logo} alt="logo" />
        </Link>
        <div>
          
          <Link to={"/signup"}>Signup</Link>
          <Link to={"/login"}>Login</Link>
        </div>
      </nav>
    );
  }
}
