var express = require("express");
var bodyParser = require("body-parser");
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");

// set up our port to be either the host's desiggnted port, or 3000
var PORT = process.env.PORT || 3000;

// Instantiate our Express App
var app = express();

// set up an Express Router

var router = express.Router();
// Require our routes file pass our router object
require("./config/routes")(router);

// Designate our public folder as a static directory
app.use(express.static(__dirname + "/public"));

// connect Handlebars to our Express app
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Use bodyParser in our app
app.use(bodyParser.urlencoded({
    extended: false
}));
// Have every request go through our router middleware

app.use(router);
// if deployed, use the deployed database.
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// Connect mongoose to our database
mongoose.connect(db, function(error) {
    if (error) {
        console.log(error);
    } else {
        console.log("mongoose connection is successful");
    }
});
// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT);
});