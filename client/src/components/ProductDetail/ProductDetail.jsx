import React, { Component } from "react";
import AssetServices from "../../Services/assetServices";
import Visualizer from "../Visualizer/Visualizer";

export default class ProductDetail extends Component {
  constructor() {
    super();
    this.state = {
      assetDetails: { author: "", comments: [{ author: "" }] },
      isLoading: true
    };
    this.service = new AssetServices();
    this._isMounted = false;
  }

  // componentDidMount() {
  //   this._isMounted = true;
  //   this.service.assets().then(assetPayload => {
  //     if (this._isMounted) {
  //       this.setState({
  //         ...this.state,
  //         assetDetails: assetPayload[0]
  //       });
  //     }
  //   });
  // }

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
    });
  }

  // componentWillUnmount() {
  //   this._isMounted = false;
  // }

  render() {
    return (
      <section className="productDetail">
        <div className="canvas">
          <Visualizer />
         
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

          <div className="comments">
            <h1>Comments</h1>
            {this.state.assetDetails.comments.map((el, idx) => {
              return (
                <div className="comment" key={idx}>
                  <h4>{el.author.username}</h4>
                  <h3>{el.description}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}
