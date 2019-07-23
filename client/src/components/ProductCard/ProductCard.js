import React, { Component } from "react";
import "../../SASS/Main.scss";

export default class ProductCard extends Component {
  render() {
    return (
      <article className="productCard">
        <div className="productImg">
          <img src="#" alt="productImg" />
        </div>
        <div className="productName">productName</div>
        <div className="productAuthor">productAuthor</div>
        <div className="productPrice">productPrice €</div>
      </article>
    );
  }
}
