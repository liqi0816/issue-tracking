module.exports = app => {
  const status = require("../controllers/status.controller.js");

  // Create a new status
  app.post("/status/createStatus", status.createStatus);

 // Create a new special status
  app.post("/status/addSpecialStatus/:statusId/:projectId/:statusType", status.addSpecialStatus);

  app.get("/status/findStatusById/:statusId", status.findStatusById);

  app.get("/status/findSpecialStatusById/:statusId", status.findSpecialStatusById);

  app.get("/status/findStatusByProjectId/:projectId", status.findStatusByProjectId);

  app.get("/status/findSpecialStatusByProjectId/:projectId", status.findSpecialStatusByProjectId);

  // Update a status with statusId
  app.put("/status/updateStatusById/:statusId", status.updateStatusById);

  app.post("/status/addTransition/:projectId/:startStatusId/:endStatusId", status.addTransition);

  app.get("/status/findTransitionById/:transitionId", status.findTransitionById);

  app.get("/status/findTransitionByProjectId/:projectId", status.findTransitionByProjectId);

  app.get("/status/findTransitionByStartStatusId/:startStatusId", status.findTransitionByStartStatusId);

  app.get("/status/findNextStatusOfIssue/:issueId", status.findNextStatusOfIssue);    

};