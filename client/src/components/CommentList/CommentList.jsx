import React, { Component } from "react";
import assetServices from "../../Services/assetServices";
import bin from "./bin.png"

export default class CommentList extends Component {
  constructor() {
    super();
    this.state = {
      description: "",
      assetDetails: { author: "", comments: [{ author: "" }] }
    };
    this.service = new assetServices();
  }

  componentDidMount() {
    this.getAsset();
  }

  getAsset() {
    const params = this.props.paramsId;
    this.service.getAsset(params).then(response => {
      this.setState({
        ...this.state,
        assetDetails: response
      });
    });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const description = this.state.description;
    const populateAsset = this.props.paramsId;

    this.service
      .createComment(description, populateAsset)
      .then(response => {
        this.setState({ description: "" });
        this.getAsset();
      })
      .catch(error => {
        console.log(error);
        this.setState({
          ...this.state,
          error: true
        });
      });
  };

  handleFormDelete = (event, id) => {
    event.preventDefault();
    let commID = id;

    this.service.deleteComment(commID).then(response => {
      this.getAsset();
    });
  };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <section className="comments">

        
        <div className="displayComments">
        <div><h1>Comments</h1></div>
        {this.state.assetDetails.comments.map((el, idx) => {
          if (this.props.loggedUser === el.author.username) {
            return (
              <div className="comment" key={idx}>
               
                <h4 className="author">{el.author.username}</h4>
                <h3 className="message">{el.description}</h3>
                
                <div>
                <form onSubmit={e => this.handleFormDelete(e, el._id)}>
                  <button className="deleteBtn"><img src={bin} alt="delete button"></img></button>
                </form>
                </div>
              </div>
            );

            
          } else {
            return (
              <div className="comment" key={idx}>
                <h4 className="author">{el.author.username}</h4>
                <h3 className="message">{el.description}</h3>
              </div>
            );
          }
        })}
        </div>
        <div className="newComment">
          <form onSubmit={this.handleFormSubmit}>
            <div>
              <textarea
              name="description"
              placeholder="Your new comment..."
              value={this.state.description}
              onChange={e => this.handleChange(e)}
            />
            </div>

            <div>
            <button>Post it!</button>
            </div>
          </form>
        </div>

      </section>
    );
  }
}
