import React, { Component } from "react";
import AssetServices from "../../Services/assetServices";

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

  componentDidMount(){
    this.getAsset()
  } 

  getAsset(){
    const params = this.props.match.params.id;
    this.service.getAsset(params).then(response =>{
      this.setState({ 
        ...this.state,
        assetDetails: response
       })
    } )
  }

  // componentWillUnmount() {
  //   this._isMounted = false;
  // }

  render() {
    return (
      <div>
        <p>{this.state.assetDetails.title}</p>
        <img
          src={this.state.assetDetails.urlPathImg}
          style={{ width: 200, height: 200 }}
          alt="ok"
        />
        <p>{this.state.assetDetails.author.description} </p>
        {this.state.assetDetails.comments.map((el, idx) => {
          return (
            <div key={idx}>
              <p>{el.description}</p>
              <p>{el.author.username}</p>
            </div>
          );
        })}
      </div>
    );
  }
}
