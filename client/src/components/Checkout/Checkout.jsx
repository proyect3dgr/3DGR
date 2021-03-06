import React, { Component } from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payedSuccessful: false
    };
    this.currency = "EUR";
  }
  fromEurotoCent(amount) {
    return amount * 100;
  }

  successPayment = data => {
    alert("Payment Successful");
  };

  errorPayment = data => {
    alert("Payment Error");
  };

  onToken = (amount, description) => token => {
    axios
      .post(`${process.env.REACT_APP_URL}/stripe-checkout`, {
        description,
        source: token.id,
        currency: this.currency,
        amount: this.fromEurotoCent(amount)
      })
      .then(this.successPayment)
      .then(this.props.emptyCart())
      .catch(this.errorPayment);
  };

  render() {
    return (
      <StripeCheckout
        style={{
          background: "transparent",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 1), 0 6px 20px 0 rgba(0, 0, 0, 1)",
          borderRadious: "1rem"
        }}
        className={"checkOut"}
        name={this.props.name}
        description={this.props.description}
        amount={this.props.amount * 100}
        image={
          "https://res.cloudinary.com/rubvaldev/image/upload/v1564482712/thing-gallery/tumblr_pnws4g87zZ1uag7foo1_640.gif.gif"
        }
        token={this.onToken(this.props.amount, this.props.description)}
        currency={this.currency}
        label={"PAY WITH RUBENS"}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE}
      />
    );
  }
  //   render() {
  //   return (
  //     <div>

  //     </div>
  //   )
  // }
}

// const CURRENCY = "EUR";

// const fromEuroToCent = amount => amount * 100;

// const successPayment = data => {
//   alert("Payment Successful");
// };

// const errorPayment = data => {
//   alert("Payment Error");
// };

// // const emptyCart = this.props.emptyCart()

// const onToken = (amount, description) => token => {
//   axios
//     .post(`${process.env.REACT_APP_URL}/stripe-checkout`, {
//       description,
//       source: token.id,
//       currency: CURRENCY,
//       amount: fromEuroToCent(amount)
//     })
//     .then(successPayment)
//     .catch(errorPayment);
// };

// const Checkout = ({ name, description, amount }) => (
//   <StripeCheckout
//     name={name}
//     description={description}
//     amount={fromEuroToCent(amount)}
//     token={onToken(amount, description)}
//     currency={CURRENCY}
//     stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE}
//   />
// );

// export default Checkout;
