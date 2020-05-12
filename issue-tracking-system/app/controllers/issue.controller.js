const Issue = require("../models/issue.model.js");

// Create and Save a new Issue
exports.createIssue = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Issue
  const issue = new Issue({
    project_id: req.body.project_id,
    reporter_id: req.body.reporter_id,
    current_status_id: req.body.current_status_id,
    issue_title: req.body.issue_title,
    issue_description: req.body.issue_description,
    create_date: req.body.create_date    
  });

  // Save Issue in the database
  Issue.createIssue(issue, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Issue."
      });
    else res.send(data);
  });
};

// Find a single Issue with a issueId
exports.findIssueById = (req, res) => {
  Issue.findIssueById(req.params.issueId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Issue with id ${req.params.issueId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Issue with id " + req.params.issueId
        });
      }
    } else res.send(data);
  });
};

exports.findIssueByProjectId = (req, res) => {
  Issue.findIssueByProjectId(req.params.projectId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Issue with project id ${req.params.projectId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Issue with project id " + req.params.projectId
        });
      }
    } else res.send(data);
  });
};

exports.SearchIssueTitle = (req, res) => {
  Issue.SearchIssueTitle(req.params.projectId,req.params.keyword, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Issue with project id ${req.params.projectId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Issue with project id " + req.params.projectId
        });
      }
    } else res.send(data);
  });
};

exports.SearchIssueDescription = (req, res) => {
  Issue.SearchIssueDescription(req.params.projectId,req.params.keyword, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Issue with project id ${req.params.projectId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Issue with project id " + req.params.projectId
        });
      }
    } else res.send(data);
  });
};

// Update a Issue identified by the issueId in the request
exports.updateIssueById = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Issue.updateIssueById(
    req.params.issueId,
    new Issue(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Issue with id ${req.params.issueId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Issue with id " + req.params.issueId
          });
        }
      } else res.send(data);
    }
  );
};

exports.getIssueHistory = (req, res) => {
  Issue.getIssueHistory(req.params.issueId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found History with issue id ${req.params.issueId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving History with issue id " + req.params.issueId
        });
      }
    } else res.send(data);
  });
};

// Create and Save a history record
exports.addIssueHistory = (req, res) => {

  Issue.addIssueHistory(req.params.issueId,req.params.assignee_id,req.params.transition_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding the issue history."
      });
    else res.send(data);
  });
};

// Delete a Issue with the specified issueId in the request
exports.remove = (req, res) => {
  Issue.remove(req.params.issueId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Issue with id ${req.params.issueId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Issue with id " + req.params.issueId
        });
      }
    } else res.send({ message: `Issue was deleted successfully!` });
  });
};

