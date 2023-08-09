const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
  retailer: {
    type: String,
    required: true
  },
  purchaseDate: {
    type: Date,
    required: true
  },
  purchaseTime: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  points:{
    type: Number,
  },
  items: [
    {
      shortDescription: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ]
});

const Receipt = new mongoose.model('Receipt', receiptSchema);

module.exports = Receipt;
