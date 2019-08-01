import React, { Component } from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

// import STRIPE_PUBLISHABLE from '../../constants/stripe';
// import PAYMENT_SERVER_URL from '../../constants/server';

const CURRENCY = "EUR";

const fromEuroToCent = amount => amount * 100;

const successPayment = data => {
  alert("Payment Successful");
};

const errorPayment = data => {
  alert("Payment Error");
};

// const emptyCart = this.props.emptyCart()

const onToken = (amount, description) => token => {
  axios
    .post(`${process.env.REACT_APP_URL}/stripe-checkout`, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromEuroToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment);
};

const Checkout = ({ name, description, amount }) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromEuroToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE}
  />
);

export default Checkout;
