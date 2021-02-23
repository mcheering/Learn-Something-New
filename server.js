const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const port = process.env.PORT || 3000;



const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
const routes = require("./controllers/project2_controllers.js");

app.use("/", routes);

app.listen(port, function () {
      console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});