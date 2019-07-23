import React, { Component } from 'react'
import AssetServices from '../../Services/assetServices'

export default class ProductDetail extends Component {

  constructor(){
    super()
    this.state = {
      assetDetails: {} 
    }
    this.service = new AssetServices() 
  } 

  componentDidMount() {

    this.service.assets().then(assetPayload => {
      console.log(assetPayload[0])
      this.setState({ 
      ...this.state,
      assetDetails: assetPayload[0] 
    }  
    )} 
    )
    
  } 

  render() {
    return (
      <div>
        <p>{this.state.assetDetails.title}</p>
        <img src={this.state.assetDetails.urlPathImg} alt ="ok"/>
        <p>{this.state.assetDetails.author}</p>
      </div>
    )
  }
}
