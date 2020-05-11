module.exports = app => {
  const project = require("../controllers/project.controller.js");

  // Create a new Customer
  app.post("/project", project.create);

  // Retrieve a single project with projectID
  app.get("/project/:projectId", project.findOne);

  // Update a Customer with customerId
  app.put("/project/:projectId", project.update);

  // Delete a Customer with customerId
  app.delete("/project/:projectId", project.delete);

  app.get("/project/getUserProjects/:userId", project.getUserProjects);

};