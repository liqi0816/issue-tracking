module.exports = app => {
  const project = require("../controllers/project.controller.js");

  // Create a new Customer
  app.post("/project/createProject", project.createProject);

  // Retrieve a single project with projectID
  app.get("/project/findProjectById/:projectId", project.findProjectById);

  // Update a Customer with customerId
  app.put("/project/updateProjectById/:projectId", project.updateProjectById);

  // Delete a Customer with customerId
  app.delete("/project/remove/:projectId", project.remove);

  app.get("/project/getUserProjects/:userId", project.getUserProjects);

};