const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

const port = 3000;
const url = "mongodb://mihir_vidjot:mihir12345@ds113648.mlab.com:13648/vidjot_angular"

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors());

// Load routes
const users = require('./routes/users');
app.use('/users', users);

const customers = require('./routes/customers');
app.use('/customers', customers);

const transactions = require('./routes/transactions');
app.use('/transactions', transactions);

   
app.listen(port, ()=> {
    console.log(`server start on post ${port}`);
})