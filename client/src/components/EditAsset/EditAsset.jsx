import React, { Component } from "react";

export default class EditAsset extends Component {
  render() {
    return (
      <div>
        <form onSubmit="cucucucucucu">
          <input
            name="title"
            type="text"
            placeholder="Asset´s Name"
            value={this.state.oldPass}
            onChange={e => this.handleChange(e)}
          />

          <textarea
            name="description"
            type="text"
            placeholder="Asset´s description"
            value={this.state.oldPass}
            onChange={e => this.handleChange(e)}
          />

          <input
            name="price"
            type="number"
            placeholder="Asset´s price"
            value={this.state.oldPass}
            onChange={e => this.handleChange(e)}
          />

          <input
            name="coverImage"
            type="text"
            placeholder="Asset´s Cover Image"
            value={this.state.oldPass}
            onChange={e => this.handleChange(e)}
          />

          <input
            name="upgrade version"
            type="text"
            placeholder="Asset´s Upgrade version"
            value={this.state.oldPass}
            onChange={e => this.handleChange(e)}
          />
        </form>
      </div>
    );
  }
}
