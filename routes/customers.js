const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

require('../models/Customers');
const Customers = mongoose.model('customer');

router.get('/all', (req, res) => {
  if(!req.query.page || !req.query.pageSize) return res.status(200).send({message: 'parameter missing', data: []})
  var page = req.query.page;
  var pageSize = req.query.pageSize;
  var skipValue = (Number(page) * pageSize) - pageSize;
  Customers.aggregate([
    { "$facet": {
        "totalData": [
          { "$match": { }},
          { "$skip": skipValue },
          { "$limit": 2 }
        ],
        "totalCount": [
          { "$count": "count" }
        ]
      }
    }
  ]).then(customers => {
    console.log(customers)
    res.status(200).send({message: 'get data successfully.', data: customers});
  })
  // find({})
  // .count()
  // .limit(2)
  // .skip(skipValue)
  // .then(customers => {
  //   console.log(customers)
  //   res.status(200).send({message: 'get data successfully.', data: customers});
  // })
  // .catch(error => {
  //   res.status(500).send({message: 'Something went worng.'})
  // })
});

router.get('/add', (req, res) => {
  res.render('customers/add');
  // Customers.find({})
  // .then(customers => {
  //   if(customers.length === 0){
  //     res.send({'status' : false, 'msg': 'No customer found.'});
  //   } else {
  //     res.send({'status' : true, 'msg': 'customers found.', data: customers});
  //   }
  // })
});

router.get('/list', (req, res) => {
  Customers.find({})
  .then(customers => {
    res.render('customers/index', {
      customers : customers
    })    
  })
});

router.post('/add', (req, res) => {
  Customers.find({name: req.body.name, phone: req.body.phone})
  .then(customers => {
    if(customers.length > 0) {
      res.status(200).send({message: 'Customer alredy added', code: 2})
    } else {
      newHomeId((homeId) => {
        if(homeId) {
          var newCustomers = new Customers({
            homeId: homeId,
            name: req.body.name,
            phone: req.body.phone
          })
          newCustomers.save()
          .then(customer => {
            res.status(200).send({message: 'customer add successfully'})
          })
          .catch(error => {
            res.status(500).send({message: 'Something went worng.'})
          })
        } else {
          res.statusCode(500).send({message: 'Something went worng.'})
        }
      });
    }
  })
  .catch(error => {
    res.statusCode(500).send({message: 'Something went worng.'})
  })
});

module.exports = router;

function newHomeId(callback){
  Customers.findOne({}, {'homeId': 1, '_id': 0})
  .sort({"homeId": -1})
  .then((resData) => {
    if(resData) {
      callback(resData.homeId + 1);
    } else {
      callback(1);
    }
  })
}