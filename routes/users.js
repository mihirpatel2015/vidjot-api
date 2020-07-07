const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const router = express.Router();
var jwt = require('jsonwebtoken');


// Load User Model
require('../models/User');
const User = mongoose.model('users');

// Login Form POST
router.post('/login', (req, res, next) => {
    User.findOne({email: req.body.username})
    .then((data) => {
        if(data) {
            bcrypt.compare(req.body.password, data.password, function(err, responce) {
                if(err) res.status(401).send({'message': 'user is unauthorize'});
                if(responce) {
                    delete data.password;
                    var token = jwt.sign({user: data}, 'shhhhasdasdasdadsh');
                    res.status(200).send({'token': token, "message": "user login successfully"})
                } else {
                    res.status(401).send({'message': 'user is unauthorize'})
                }
            });
        } else {
            res.status(404).send({'message': 'user not found'})
        }
    })
    .catch((err) => {

    })
})
  
// Register Form POST
router.post('/register', (req, res) => {
    try{
        User.find({email : req.body.email})
        .then(user => {
            if(user.length > 0) {
              return res.status(200).send({message: 'This email is already exist.', code: 1})
            }
            const newUser = new User({
                name : req.body.name,
                email : req.body.email,
                phone : req.body.phone,
                password : req.body.password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => { 
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => {
                        res.status(200).send({message: 'register user successfully'});
                    })
                    .catch(err => {
                        res.status(500).send({message: 'Something went worng.'})
                    })
                });
            });
        })
        .catch(err => {
            res.status(500).send({message: 'Something went worng.'})
        })
    } catch(err) {
        res.status(500).send({message: 'Something went worng.', err: err})
    }
})

module.exports = router;
  