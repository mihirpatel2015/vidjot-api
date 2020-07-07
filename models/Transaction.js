const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const TransactionSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'customer',
    required: true
  },
  value: {
    type: Number,
    required: true    
  },
  type: {
    type: String,
    enum: ['gm', 'lt'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('transaction', TransactionSchema);
