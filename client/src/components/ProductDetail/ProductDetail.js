import React, { Component } from 'react'
import AssetServices from '../../Services/assetServices'

export default class ProductDetail extends Component {

  constructor(){
    super()
    this.state = {
      assetDetails:{author:"", comments:[{author:""}]}    
    }
    this.service = new AssetServices() 
  } 

  componentDidMount() {

    this.service.assets().then(assetPayload => {
      this.setState({ 
      ...this.state,
      assetDetails: assetPayload[0]
    }  
    )} 
    )
    
  } 

  render() { 
    console.log(this.state.assetDetails.comments[0])
    return (
      <div>
        <p>{this.state.assetDetails.title}</p>
        <img src={this.state.assetDetails.urlPathImg} style={{width: 200, height: 200}}  alt ="ok"/>
        <p>{this.state.assetDetails.author.description} </p>
{
  this.state.assetDetails.comments.map((el, idx) => {
    return (<div key={idx}><p>{el.description}</p>
      <p>{el.author.username}</p></div>)
  } )
} 

      </div>
    )
  }
}
