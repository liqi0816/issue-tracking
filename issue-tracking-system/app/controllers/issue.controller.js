const Issue = require("../models/issue.model.js");

// Create and Save a new Issue
exports.create = (req, res) => {
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
  Issue.create(issue, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Issue."
      });
    else res.send(data);
  });
};

// Find a single Issue with a issueId
exports.findOne = (req, res) => {
  Issue.findById(req.params.issueId, (err, data) => {
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

// Update a Issue identified by the issueId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Issue.updateById(
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

// Delete a Issue with the specified issueId in the request
exports.delete = (req, res) => {
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

