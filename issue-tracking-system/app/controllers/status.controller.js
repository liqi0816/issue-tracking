const Status = require("../models/status.model.js");

// Create and Save a new Status
exports.createStatus = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Status
  const status = new Status({
    project_id: req.body.project_id,
    status_name: req.body.status_name,
  });

  // Save Status in the database
  Status.createStatus(status, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Status."
      });
    else res.send(data);
  });
};

// Create and Save a new specialStatus
exports.addSpecialStatus = (req, res) => {

  // Save special Status in the database
  Status.addSpecialStatus(req.params.statusId,req.params.projectId,req.params.statusType, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding the special Status."
      });
    else res.send(data);
  });
};

// Find a single status with a statusId
exports.findStatusById = (req, res) => {
  Status.findStatusById(req.params.statusId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Status with id ${req.params.statusId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Status with id " + req.params.statusId
        });
      }
    } else res.send(data);
  });
};

// Find a single special status with a statusId
exports.findSpecialStatusById = (req, res) => {
  Status.findSpecialStatusById(req.params.statusId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found special Status with id ${req.params.statusId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving special Status with id " + req.params.statusId
        });
      }
    } else res.send(data);
  });
};


exports.findStatusByProjectId = (req, res) => {
  Status.findStatusByProjectId(req.params.projectId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Status with project id ${req.params.projectId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Status with project id " + req.params.projectId
        });
      }
    } else res.send(data);
  });
};

exports.findSpecialStatusByProjectId = (req, res) => {
  Status.findSpecialStatusByProjectId(req.params.projectId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Status with id ${req.params.projectId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Status with id " + req.params.projectId
        });
      }
    } else res.send(data);
  });
};

// Update a status identified by the statusId in the request
exports.updateStatusById = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Status.updateStatusById(req.params.statusId, new Status(req.body),(err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Status with id ${req.params.statusId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Status with id " + req.params.statusId
          });
        }
      } else res.send(data);
    }
  );
};

// Create and Save a new specialStatus
exports.addTransition = (req, res) => {

  // Save special Status in the database
  Status.addTransition(req.params.projectId,req.params.startStatusId,req.params.endStatusId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding the special Status."
      });
    else res.send(data);
  });
};

// Find a single transition with a transitionId
exports.findTransitionById = (req, res) => {
  Status.findTransitionById(req.params.transitionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Transition with id ${req.params.transitionId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Transition with id " + req.params.transitionId
        });
      }
    } else res.send(data);
  });
};

// Find a single transition with a projectId
exports.findTransitionByProjectId = (req, res) => {
  Status.findTransitionByProjectId(req.params.projectId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Transition with project id ${req.params.projectId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Transition with project id " + req.params.projectId
        });
      }
    } else res.send(data);
  });
};

// Find a single transition with a startStatusId
exports.findTransitionByStartStatusId = (req, res) => {
  Status.findTransitionByStartStatusId(req.params.startStatusId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Transition with start status id ${req.params.startStatusId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Transition with start status id " + req.params.startStatusId
        });
      }
    } else res.send(data);
  });
};

// Find a possible next status with a issueId
exports.findNextStatusOfIssue = (req, res) => {
  Status.findNextStatusOfIssue(req.params.issueId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found possible next status with issue id ${req.params.issueId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving possible next status with issue id " + req.params.issueId
        });
      }
    } else res.send(data);
  });
};

