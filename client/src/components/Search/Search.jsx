import React, { Component } from "react";

export default class Search extends Component {
  render() {
    return (
      <React.Fragment>
        <input
          className="search"
          type="search"
          name="search"
          placeholder="Search..."
          onChange={(e) => this.props.filterProductHandler(e)}
          value={this.props.filterQuery}
        />
      </React.Fragment>
    );
  }
}
