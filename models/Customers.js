const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  homeId: {
    type: Number,
    required: true
  },
  phone: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('customer', CustomerSchema);
