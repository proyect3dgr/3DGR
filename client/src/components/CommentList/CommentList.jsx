import React, { Component } from "react";
import assetServices from "../../Services/assetServices";

export default class CommentList extends Component {

  constructor() {
    super()
    this.state = {
      description: ""
    }
    this.service = new assetServices()
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const description = this.state.description;
    const populateAsset = this.props.paramsId

    this.service.createComment(description, populateAsset)
      .then(response => {
        this.setState({description:""});  
        this.props.renderAsset()      
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
    console.log(this.state.description)
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    console.log(this.props);
    return (
      <div className="comments">
        <h1>Comments</h1>
        {this.props.comments.map((el, idx) => {
          return (
            <div className="comment" key={idx}>
              <h4>{el.author.username}</h4>
              <h3>{el.description}</h3>
            </div>
          );
        })}

        <form onSubmit={this.handleFormSubmit}>
          <textarea
            name="description"
            placeholder="description"
            value={this.state.description}
            onChange={e => this.handleChange(e)}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
