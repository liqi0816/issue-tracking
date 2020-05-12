module.exports = app => {
  const user = require("../controllers/user.controller.js");

  // Create a new Customer
  app.post("/user/createUser", user.createUser);

  // Retrieve a single user with userID
  app.get("/user/findUserById/:userId", user.findUserById);

  // Update a Customer with customerId
  app.put("/user/updateUserById/:userId", user.updateUserById);

  // Delete a Customer with customerId
  app.delete("/user/remove/:userId", user.remove);

  app.post("/user/grantLead/:grantorId/:granteeId/:projectId", user.grantLead)

  app.post("/user/assignIssue/:assignorId/:assigneeId/:issueId", user.assignIssue)

  app.get("/user/checkIfGrantee/:granteeId/:projectId", user.checkIfGrantee)

  app.get("/user/checkIfAssignee/:assigneeId/:issueId", user.checkIfAssignee)
};