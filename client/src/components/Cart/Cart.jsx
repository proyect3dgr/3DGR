import React, { Component } from "react";
import { Link } from "react-router-dom";
import Checkout from "../Checkout/Checkout";

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
        <section className="cartCheckoutBg">
          <h1>Shopping Cart</h1>
          <hr />
          <p>You have no items in your cart</p>
          <hr />
          <Link to="/">
            <button>CONTINUE SHOPPING</button>
          </Link>
        </section>
      );
    }
    return (
      <section className="cartCheckoutBg">
        <h1>Shopping Cart</h1>
        <hr />
        <article className="cartCheckout">
          <div className="containerItems">
            {this.state.cart.map((cartItem, idx) => {
              return (
                <div className="item" key={idx}>
                  <div className="itemImg">
                    <img
                      className="realImg"
                      src={cartItem.urlPathImg}
                      alt="item"
                    />
                  </div>
                  <div className="itemTP">
                    <p>{cartItem.title}</p>
                    <p>{cartItem.price} €</p>
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        this.props.removeProductFromBasket(cartItem.idx)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <hr />
          <div className="totalPrice">
            <div>
              <span>Total Price:</span>
            </div>
            <div>
              <span>{this.props.getCartTotal()} €</span>
            </div>
          </div>
          <div className="buttonsPart">
            <Link to="/">
              <button>CONTINUE SHOPPING</button>
            </Link>
            <Checkout
              name={"3DGR Checkout"}
              description={"Give me all your money"}
              amount={this.props.getCartTotal()}
              onClick={e => this.props.emptyCart(e)}
            />
          </div>
        </article>
      </section>
    );
  }
}
