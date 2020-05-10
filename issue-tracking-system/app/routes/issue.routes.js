module.exports = app => {
  const issue = require("../controllers/issue.controller.js");

  // Create a new Issue
  app.post("/issue", issue.create);

  // Retrieve a single issue with issueID
  app.get("/issue/:issueId", issue.findOne);

  // Update a Issue with issueId
  app.put("/issue/:issueId", issue.update);

  // Delete a Issue with issueId
  app.delete("/issue/:issueId", issue.delete);

};