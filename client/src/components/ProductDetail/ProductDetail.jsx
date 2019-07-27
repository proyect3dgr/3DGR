import React, { Component } from "react";
import AssetServices from "../../Services/assetServices";
import Visualizer from "../Visualizer/Visualizer";
import CommentList from "../CommentList/CommentList";

export default class ProductDetail extends Component {
  constructor() {
    super();
    this.state = {
      assetDetails: { author: "", comments: [{ author: "" }] },
      title: "",
      price: undefined,
      description: "",
      image: "",
      isLoading: true
    };
    this.service = new AssetServices();
  }

  componentDidMount() {
    this.getAsset();
  }

  getAsset() {
    const params = this.props.match.params.id;
    this.service.getAsset(params).then(response => {
      this.setState({
        ...this.state,
        assetDetails: response
      });
      console.log(this.state.assetDetails.urlPathModel);
    });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const description = this.state.description;
    const title = this.state.title;
    const price = this.state.price;
    const image = this.state.image;
    const _id = this.props.match.params.id;

    if (!image) {
      this.service
        .editAsset(_id, title, price, description)
        .then(response => {
          this.setState({ title: "", description: "", price: undefined });
        })
        .then(response => {
          this.getAsset();
        })
        .catch(error => {
          console.log(error);
          this.setState({
            ...this.state,
            error: true
          });
        });
    } else {
      this.service.editAssetImg(_id, image).then(response => {
        this.setState({ image: "" });
        this.getAsset();
      });
    }
  };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    if (this.props.username === this.state.assetDetails.author.username) {
      return (
        <React.Fragment>
          <section className="productDetail">
            <div className="canvas">
              <Visualizer {...this.state.assetDetails} />
            </div>

            <div className="aside">
              <div>
                <h1>{this.state.assetDetails.title}</h1>
                <img
                  className="photo"
                  src={this.state.assetDetails.urlPathImg}
                  alt="ok"
                />
                <h2>{this.state.assetDetails.description}</h2>
                <h5>{this.state.assetDetails.price} €</h5>
              </div>

              <CommentList
                loggedUser={this.props.username}
                paramsId={this.props.match.params.id}
              />
            </div>
          </section>

          <section className="productDetail">
            <form onSubmit={this.handleFormSubmit}>
              <input
                name="title"
                placeholder="Choose new title"
                value={this.state.title}
                onChange={e => this.handleChange(e)}
              />
              <input
                name="description"
                placeholder="Edit description"
                value={this.state.description}
                onChange={e => this.handleChange(e)}
              />
              <input
                name="price"
                type="number"
                placeholder="Choose new price"
                value={this.state.price}
                onChange={e => this.handleChange(e)}
              />

              <button>Submit</button>
            </form>
            <form onSubmit={this.handleFormSubmit}>
              <input
                name="image"
                placeholder="Choose Avatar URL"
                value={this.state.image}
                onChange={e => this.handleChange(e)}
              />
              <button>Change avatar</button>
            </form>
          </section>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <section className="productDetail">
          <div className="canvas">
            <Visualizer {...this.state.assetDetails} />
          </div>

          <div className="aside">
            <div>
              <h1>{this.state.assetDetails.title}</h1>
              <img
                className="photo"
                src={this.state.assetDetails.urlPathImg}
                alt="ok"
              />
              <h2>{this.state.assetDetails.description}</h2>
              <h5>{this.state.assetDetails.price} €</h5>
            </div>

            <CommentList
              loggedUser={this.props.username}
              paramsId={this.props.match.params.id}
            />
          </div>
        </section>
      </React.Fragment>
    );
  }
}
