import React, { Component } from "react";
import "../../SASS/Main.scss";
import ProductCard from "../ProductCard/ProductCard";

export default class ProductList extends Component {
  render() {
    return (
      <React.Fragment>
        
        <section className="productList">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </section>
      </React.Fragment>
    );
  }
}
