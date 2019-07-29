import React, { Component } from "react";
import "../../SASS/Main.scss";
import ProductCard from "../ProductCard/ProductCard";
import AssetServices from "../../Services/assetServices";
import Search from "../Search/Search";

export default class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      assetDetails: [{ author: "" }],
      isLoading: true,
      filteredAssets: [{ author: "" }]
    };
    this.service = new AssetServices();
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.service.assets().then(assetPayload => {
      if (this._isMounted) {
        this.setState({
          ...this.state,
          assetDetails: assetPayload,
          filteredAssets: assetPayload
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <section className="allProductList">
        <div className="searchBar">
          <Search filter={this.props.filter} />
        </div>

        <div className="productList">
          {this.state.assetDetails.map((asset, idx) => (
            <ProductCard key={idx} {...asset} />
          ))}
        </div>
      </section>
    );
  }
}
