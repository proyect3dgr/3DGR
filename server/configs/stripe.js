const configureStripe = require('stripe');

const stripe = configureStripe(process.env.stripeKey);

module.exports = stripe;