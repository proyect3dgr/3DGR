import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";

export default class DropDownMenu extends Component {
  render() {
    return (
      <Dropdown className="dropMenu">
        <Dropdown.Toggle variant="" id="dropdown-basic">
          <img
            className="avatar"
            src={this.props.userLogged.avatar}
            alt="avatar"
          />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href={`/profile/${this.props.userLogged.username}`}>
            {/* <Link to={`/profile/${this.props.userLogged.username}`}>
              Profile
            </Link> */}
            Profile
          </Dropdown.Item>

          <Dropdown.Item href={"/settings"}>
            {/* <Link to={"/profile/settings"}>Settings</Link> */}
            Settings
          </Dropdown.Item>

          <Dropdown.Item href={"/product/upload"}>
            {/* <Link to={"/product/upload"}>Upload New Asset</Link> */}
            Upload New Asset
          </Dropdown.Item>

          <Dropdown.Item
            onClick={e => {
              this.props.logout(e);
            }}
          >
            Log Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
