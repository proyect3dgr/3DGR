import React, { Component } from "react";
import UploadAsset from "../UploadAsset/UploadAsset";
import ProductCard from "../ProductCard/ProductCard";
import assetServices from "../../Services/assetServices";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = { assetCollection: [] };
    this.service = new assetServices();
  }

  getProfile = () => {
    const params = this.props._id;
    this.service.getUser(params).then(response => {
      this.setState(response);
    });
  };

  componentDidMount() {
    this.getProfile();
  }

  render() {
    return (
      <React.Fragment>
        <section className="infoUser">
          <article>
            <img src={this.props.avatar} alt="blabla" />
            <h1>{this.props.username}</h1>
            <p>{this.props.about}</p>

            <p>{this.props.email}</p>

            <button
              onClick={e => {
                this.props.logout(e);
              }}
            >
              LOGOUT
            </button>
          </article>
          <section className="statistics">
            <h1>Statistics</h1>
            <UploadAsset />
          </section>
        </section>

        <div className="lowPart">
          <section className="collection">
            <h1>Collection</h1>
            <ul>
              {this.state.assetCollection.map((asset, idx) => (
                <li key={idx}>
                  <ProductCard className="cocowawa" {...asset} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </React.Fragment>
    );
  }
}
