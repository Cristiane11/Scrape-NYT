// Dependencies

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

// Setting up express app
var db = require('./models')
var PORT = process.env.PORT || 8080;
var app = express();


// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Use morgan logger for logging requests

app.use(logger('dev'));

// Sets up express to use body parser

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Sets up Handlebars

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// Sets up the static directory
app.use(express.static('public'));

// Import router

var htmlRoutes = require('./controllers/htmlController.js');
var scraper = require('./controllers/scraper.js')
app.use(htmlRoutes);
app.use(scraper);



app.listen(PORT, function() {
    console.log('Server listening on: http://localhost:' + PORT)
})