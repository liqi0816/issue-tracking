const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to out Issue-Tracking system." });
});


require("./app/routes/customer.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/login.routes.js")(app);
require("./app/routes/project.routes.js")(app);
require("./app/routes/status.routes.js")(app);
require("./app/routes/issue.routes.js")(app);

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});