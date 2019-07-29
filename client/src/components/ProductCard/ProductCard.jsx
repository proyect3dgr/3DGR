import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ProductCard extends Component {
  render() {
    return (
      <Link to={`/product/${this.props._id}`}>
        <article className="productCard">
          <div className="productImg">
            <img src={this.props.urlPathImg} alt="productImg" />
          </div>

          <div className="productName">{this.props.title}</div>
          <div className="productAuthor">{this.props.author.username}</div>
          <div className="productPrice">{this.props.price} €</div>
        </article>
      </Link>
    );
  }
}
