const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;

require('../models/Transaction');
const Transactions = mongoose.model('transaction');

router.get('/list', (req, res) => {
  Transactions.find()
  .populate('customerId')
  .then(transactions => {
    res.render('transactions/list', {
      transactions : transactions
    })    
  })
});

router.get('/list/:customersId', (req, res) => {
  Transactions.find({'customerId': ObjectId(req.params.customersId)})
  .then(transactions => {
    res.render('transactions/index', {
      transactions : transactions,
      helpers : {
        convertDate: (date) => {
          return convertDateHelper(date)
        }
      }
    })
  })
});

router.post('/add', (req, res) => {
  var newTransactions = new Transactions({
    customerId: req.body.customerId,
    value: req.body.value,
    type: req.body.type
  })
  newTransactions.save()
  .then(transaction => {
    if(transaction){
      res.send({'status' : true, 'msg': 'added.', data: transaction});
    } else {
      res.send({'status' : false, 'msg': ' not save.'});
    }
  })
});

module.exports = router;