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
          <Dropdown.Item>
            <Link to={`/profile/${this.props.userLogged.username}`}>
              Profile
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to={"/profile/settings"}>Settings</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to={"/product/upload"}>Upload New Asset</Link>
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
