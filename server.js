var util = require("util");

// Express.
var express = require("express");

// Routes.
var util = require("util");

// Create Express app.
var app = express();

// app.use(express["static"](__dirname + "/www"));
app.use(express.bodyParser());
app.use(app.router);

// Hello World route.
app.get("/", function(request, response) {
	response.send("Hello World!");
});

// Other routes.
var routes = require("./routes/api").app(app);

var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log(util.format("Listening on %d.", port));
});
