const express = require('express');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const ExpressError = require('express-error');
const mongoSanitize = require('express-mongo-sanitize');
const MongoDBStore = require("connect-mongo")(session);
const path = require('path');
const router = express.Router();
const bodyParser = require("body-parser");
const assert = require('assert');

const app = express();

const events = require('./models/events');
const { captureRejectionSymbol } = require('events');
const { name } = require('ejs');
const { request } = require('http');
const { response } = require('express');


mongoose.connect('mongodb://localhost:27017/images', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('db connected');

    }).catch(err => {
        console.log(err);
    });
const imageSchema = new mongoose.Schema({
    id: Number,
    name: String,
    url: String
});

// From schema we create a model.
const Image = mongoose.model('Image', imageSchema);
module.exports = Image;