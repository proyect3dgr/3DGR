const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const paymentSchema = new Schema({
  name: String,
  company: String,
  address: String,
  city: String,
  country: Number,
  zipCode: String,
  card: Number,
  cvv: Number,
  expDate: Date,
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;