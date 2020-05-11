const User = require("../models/user.model.js");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const user = new User({
    user_email: req.body.user_email,
    user_name: req.body.user_name,
    user_alias: req.body.user_alias,
    user_password: req.body.user_password,
    create_date: req.body.create_date
    
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

// Find a single User with a userId
exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.userId
        });
      }
    } else res.send(data);
  });
};

// Update a User identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  User.updateById(req.params.userId, new User(req.body),(err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.userId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a User with the specified userId in the request
exports.delete = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.userId
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

exports.grantLead = (req, res) => {
  User.grantLead(req.params.grantorId,req.params.granteeId,req.params.projectId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating."
      });
    else res.send(data);
  });
};

exports.assignIssue = (req, res) => {
  User.assignIssue(req.params.assignorId,req.params.assigneeId,req.params.issueId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating."
      });
    else res.send(data);
  });
};

exports.checkIfGrantee = (req, res) => {
  User.checkIfGrantee(req.params.granteeId,req.params.projectId,(err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Grantee with id ${req.params.granteeId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Grantee with id " + req.params.granteeId
        });
      }
    } else res.send(data);
  });
};

exports.checkIfAssignee = (req, res) => {
  User.checkIfAssignee(req.params.assigneeId,req.params.issueId,(err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Assignee with id ${req.params.assigneeId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Assignee with id " + req.params.assigneeId
        });
      }
    } else res.send(data);
  });
};