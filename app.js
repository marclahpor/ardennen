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
const { body, validationResult } = require('express-validator');



var Image = require('./db');
// using a database?
// uncomment the code below and rename "myDB" into your own database


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

// set public folder to include CSS and JS in your main template
// like href="css/main.css"
// see index.ejs template
app.use(express.static(__dirname + '/public'));

// paths for including Bootstrap, jQuery and Popper
// from the node_modules folder
// and include them like href="/css/bootstrap.min.css"
// or JS like src="/js/bootstrap.min.js"
// see index.ejs template
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist/'));

// retrieve data from posts in JSON format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const event = mongoose.model('event', eventsSchema);
app.use(express.urlencoded({ 'extended': true }))

app.post('/submit', body('name').not().isEmpty().trim().escape(), body('url').not().isEmpty().trim().escape(), (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.redirect('/?valid=' + false)

    }

    const name = request.body.name;
    const url = request.body.url;

    const image1 = new Image({
        id: 1, name: name, url: url
    })

    image1.save(function (err, image) {
        if (err) return console.error(err);

    });
    response.redirect('/')
})

// put your routes here
app.get('/', function (req, res) {
    const valid = req.query.valid;
    Image.find({}, function (err, images) {
        res.render('layouts/index', { images: images, isValid: valid === undefined || valid === null });
    });
});

app.get('/about', (req, res) => {
    res.render('layouts/index', {
        page: 'about',
    })
});


// set up a port for your localhost
app.listen(8080, () => {
    console.log('Hi! :-) I\'m listening to port 8080')
});
