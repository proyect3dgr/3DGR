import React, { Component } from "react";
import ProductCard from "../ProductCard/ProductCard";
import AssetServices from "../../Services/assetServices";
import Search from "../Search/Search";

export default class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      filterQuery: "",
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



  // handleInputChange = event => {
  //   const query = event.target.value;

  //   this.setState(prevState => {
  //     const filteredData = prevState.data.filter(element => {
  //       return element.name.toLowerCase().includes(query.toLowerCase());
  //     });

  //     return {
  //       query,
  //       filteredData
  //     };
  //   });
  // };


  filterProduct(e) {
    
    const filter = e.target.value;
    
    let filteredProducts = this.state.assetDetails.filter(product => {
      return product.title.toLowerCase().indexOf(filter.toLowerCase()) > -1;
    });

    this.setState({
      ...this.state,
      filterQuery: filter,
      filteredAssets: filteredProducts,
    });
  }

  render() {
    return (
      <section className="allProductList">
        <div className="searchBar"   >
          <Search filterQuery={this.state.filterQuery} filterProductHandler={e => this.filterProduct(e)}/>
        </div>

        <div className="productList">
          {this.state.filteredAssets.map((asset, idx) => (
            <ProductCard key={idx} {...asset} />
          ))}
        </div>
      </section>
    );
  }
}
