module.exports = app => {
  const user = require("../controllers/user.controller.js");

  // Create a new Customer
  app.post("/user", user.create);

  // Retrieve a single user with userID
  app.get("/user/:userId", user.findOne);

  // Update a Customer with customerId
  app.put("/user/:userId", user.update);

  // Delete a Customer with customerId
  app.delete("/user/:userId", user.delete);

};