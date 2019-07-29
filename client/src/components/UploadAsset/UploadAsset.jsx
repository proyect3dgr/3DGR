import React, { Component } from "react";
import assetServices from "../../Services/assetServices";

export default class UploadAsset extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      price: "",
      description: ""
    };
    this.service = new assetServices();
  }
  //HAcer que se actualice al crear nuevo asset con el
  //setAsset
  handleFormSubmit = event => {
    event.preventDefault();
    const title = this.state.title;
    const price = this.state.price;
    const description = this.state.description;

    console.log(title + price + description);
    this.service

      .createAsset(title, price, description)
      .then(response => {
        this.setState({ title: "", price: "", description: "" });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          ...this.state,
          error: true
        });
      });
  };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <input
          name="title"
          placeholder="title"
          value={this.state.title}
          onChange={e => this.handleChange(e)}
        />
        <input
          name="price"
          placeholder="price"
          value={this.state.price}
          onChange={e => this.handleChange(e)}
        />
        <textarea
          name="description"
          placeholder="description"
          value={this.state.description}
          onChange={e => this.handleChange(e)}
        />

        <button>Submit</button>
      </form>
    );
  }
}
