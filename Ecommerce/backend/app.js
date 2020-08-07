const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const app = express();


const productsRoute = require('./routes/products');
const usersRoute = require('./routes/orders');
const bodyParser = require("express");

app.use(cors())
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/products', productsRoute)
app.use('/api/orders', usersRoute)


app.use(cors({
    origin: "*",
    methods: ['GET', 'POST','PATCH','DELETE','PUT'],
    allowedHeaders: 'content-type, Authorization,Origin, X-Requested-with, Accept '
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



module.exports = app;
