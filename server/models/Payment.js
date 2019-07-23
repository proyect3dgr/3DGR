const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const assetSchema = new Schema({
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

const Asset = mongoose.model('Asset', assetSchema);
module.exports = Asset;