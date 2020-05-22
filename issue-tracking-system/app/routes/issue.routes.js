module.exports = app => {
  const issue = require("../controllers/issue.controller.js");

  // Create a new Issue
  app.post("/issue/createIssue", issue.createIssue);

  // Retrieve a single issue with issueID
  app.get("/issue/findIssueById/:issueId", issue.findIssueById);

  app.get("/issue/findIssueByProjectId/:projectId", issue.findIssueByProjectId);

  app.get("/issue/SearchIssueTitle/:projectId/:keyword", issue.SearchIssueTitle);

  app.get("/issue/SearchIssueDescription/:projectId?/:keyword?", issue.SearchIssueDescription);  

  app.get("/issue/Search/:projectId/:projectTitle?/:ProjectDescription?/:issueTitle?/:issueDescription?/:status?/:assignee?/:reporter?", issue.Search);  

  // Update a Issue with issueId
  app.put("/issue/updateIssueById/:issueId", issue.updateIssueById);

  app.get("/issue/getIssueHistory/:issueId", issue.getIssueHistory);  

  app.post("/issue/addIssueHistory/:issueId/:assignee_id/:transition_id", issue.addIssueHistory);  

  // Delete a Issue with issueId
  app.delete("/issue/remove/:issueId", issue.remove);

};