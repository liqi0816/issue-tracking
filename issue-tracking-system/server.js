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

// frontend static
require("./app/routes/frontend.routes.js")(app);

// CSRF: check 'x-requested-with'
app.use((req, res, next) => {
    if (req.headers['x-requested-with'] === undefined) {
        return res.status(401).send();
    }
    return next();
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