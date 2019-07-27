import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./logo2.gif";
import cart from "./cart.png";
import DropDownMenu from "../DropDownMenu/DropDownMenu";

export default class Nav extends Component {
  render() {
    if (this.props.userLogged) {
      return (
        <nav className="nav">
          <Link to={"/"}>
            <img className="logo" src={logo} alt="logo" />
            <span className="name">3DGR</span>
          </Link>

          <div className="menu">
            <div>
              <DropDownMenu
                logout={this.props.logout}
                userLogged={this.props.userLogged}
              />
            </div>
            <div>
              <Link to={"/cart"}>
                <img className="cart" src={cart} alt="cart" />
              </Link>
            </div>
          </div>
        </nav>
      );
    }

    return (
      <nav className="nav">
        <Link to={"/"}>
          <img className="logo" src={logo} alt="logo" />
        </Link>

        <div className="menu">
          <div>
            <Link to={"/signup"}>Signup</Link>
          </div>
          <div>
            <Link to={"/login"}>Login</Link>
          </div>
        </div>
      </nav>
    );
  }
}

