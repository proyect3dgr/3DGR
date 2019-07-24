import React, { Component } from "react";

export default class UploadAsset extends Component {
  constructor() {
      super()
      this.state = {
          title:"",
          price:""
      }
  }
  
    handleFormSubmit = event => {

    event.preventDefault();
    const title = this.state.title;
    const price = this.state.price;

    this.service
      .then(response => {
        this.setState({ title: "", price: "" });
        this.props.getUser(response);
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
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <input name="title" placeholder="title" value={this.state.title} />
        <input name="price" placeholder="price" value={this.state.price} />

        <button>Submit</button>
      </form>
    );
  }
}
