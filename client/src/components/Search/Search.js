import React, { Component } from "react";
import "../../SASS/Main.scss";

export default class Search extends Component {
  render() {
    return (
      <React.Fragment>
        <input
          className="search"
          type="search"
          name="search"
          placeholder="Search..."
          onChange={this.props.filter}
          value={this.props.filterQuery} 
        />
      </React.Fragment>
    );
  }
}
