import React, { Component } from "react";
import AssetServices from "../../Services/assetServices";
import Visualizer from "../Visualizer/Visualizer";
import CommentList from "../CommentList/CommentList";
import { Redirect } from "react-router-dom";

export default class ProductDetail extends Component {
  constructor() {
    super();
    this.state = {
      assetDetails: { author: "", comments: [{ author: "" }] },
      title: "",
      price: undefined,
      description: "",
      image: "",
      isLoading: true,
      addedToCart: false
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

  handleCartAdd = event => {
    event.preventDefault();
    this.props.addToCart(this.state.assetDetails);

    this.setState({ ...this.state, addedToCart: true });
  };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    if (this.state.addedToCart === true) {
      return <Redirect to="/cart" />;
    }
    return (
      <React.Fragment>
        <section className="productDetail">
          <div className="canvas">
            <Visualizer {...this.state.assetDetails} />
          </div>

          <div className="aside">
            <h1 className="titleAsset">{this.state.assetDetails.title}</h1>
            <img
              className="photo"
              src={this.state.assetDetails.urlPathImg}
              alt="assetPhoto"
            />
            <h2 className="descriptionAsset">
              {this.state.assetDetails.description}
            </h2>
            <h5 className="priceAsset">{this.state.assetDetails.price} €</h5>

            {this.props.username === this.state.assetDetails.author.username ||
            this.props.username == null ? null : (
              <button onClick={e => this.handleCartAdd(e)}>Add to Cart</button>
            )}
          </div>
        </section>

        <CommentList
          loggedUser={this.props.username}
          paramsId={this.props.match.params.id}
        />
      </React.Fragment>
    );
  }
}
