const Project = require("../models/project.model.js");

// Create and Save a new Project
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Project
  const project = new Project({
    creator_id: req.body.creator_id,
    project_name: req.body.project_name,
    project_description: req.body.project_description,
    create_date: req.body.create_date

  });

  // Save Project in the database
  Project.create(project, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project."
      });
    else res.send(data);
  });
};

// Find a single Project with a projectId
exports.findOne = (req, res) => {
  Project.findById(req.params.projectId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Project with id ${req.params.projectId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Project with id " + req.params.projectId
        });
      }
    } else res.send(data);
  });
};

// Update a Project identified by the projectId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Project.updateById(
    req.params.projectId,
    new Project(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Project with id ${req.params.projectId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Project with id " + req.params.projectId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Project with the specified projectId in the request
exports.delete = (req, res) => {
  Project.remove(req.params.projectId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Project with id ${req.params.projectId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Project with id " + req.params.projectId
        });
      }
    } else res.send({ message: `Project was deleted successfully!` });
  });
};

