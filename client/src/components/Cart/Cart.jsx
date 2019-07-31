import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    };
  }

  componentDidMount() {
    this.setState({ ...this.props });
  }

  render() {
    if (this.props.cart.length === 0) {
      return (
        <React.Fragment>
          <Link to="/">Back to the Models</Link>

          <p>You have no items in your cart</p>
        </React.Fragment>
      );
    }
    return (
      <section className="cart">
        <Link to="/">Back to the Shop</Link>

        <h2>Total {this.props.getCartTotal()}$</h2>

        <div>
          {this.state.cart.map((cartItem, idx) => {
            return (
              <div key={idx}>
                <p>{cartItem.title}</p>
                <p>{cartItem.price}</p>
              </div>
            );
          })}
        </div>

        <div />

        <div />
      </section>
    );
  }
}
