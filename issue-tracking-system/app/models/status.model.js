const sql = require("./db.js");

const Status = function(status) {
  this.project_id = status.project_id;
  this.status_name = status.status_name;
};


Status.createStatus = (newStatus, result) => {
  sql.query("INSERT INTO status SET ?", newStatus, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created status: ", { id: res.insertId, ...newStatus });
    result(null, { id: res.insertId, ...newStatus });
  });
};

Status.addSpecialStatus = (statusId, projectId,statusType , result) => {
  sql.query("INSERT INTO special_status SET status_id=?, project_id=?, status_type=?",
  [statusId, projectId,statusType ], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created special status: ", { statusId: statusId, projectId:projectId, statusType:statusType });
    result(null, { statusId: statusId, projectId:projectId, statusType:statusType });
  });
};


Status.findStatusById = (statusId, result) => {
  sql.query(`SELECT * FROM status WHERE status_id = ${statusId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found status: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found status with the id
    result({ kind: "not_found" }, null);
  });
};

Status.findSpecialStatusById = (statusId, result) => {
  sql.query(`SELECT * FROM special_status WHERE status_id = ${statusId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found special status: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found special status with the id
    result({ kind: "not_found" }, null);
  });
};

Status.findStatusByProjectId = (projectId, result) => {
  sql.query(`SELECT * FROM status WHERE project_id = ${projectId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("stataus of the project: ", res);
    result(null, res);
  });
};

Status.findSpecialStatusByProjectId = (projectId, result) => {
  sql.query(`SELECT * FROM special_status WHERE project_id = ${projectId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("special stataus of the project: ", res);
    result(null, res);
  });
};


Status.updateStatusById = (id, status, result) => {
  sql.query(
    "UPDATE status SET status_name = ? WHERE status_id = ?",
    [status.status_name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found status with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated status: ", { id: id, ...status });
      result(null, { id: id, ...status });
    }
  );
};

Status.addTransition = (projectId,startStatusId,endStatusId , result) => {
  sql.query("INSERT INTO transition SET project_id = ?, start_status_id = ?, end_status_id =?",
  [projectId, startStatusId,endStatusId ], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created trasition: ", { projectId: projectId, startStatusId:startStatusId, endStatusId:endStatusId });
    result(null, { projectId: projectId, startStatusId:startStatusId, endStatusId:endStatusId });
  });
};

Status.findTransitionById = (transitionId, result) => {
  sql.query(`SELECT * FROM transition WHERE transition_id = ${transitionId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found trnsition: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found transition with the id
    result({ kind: "not_found" }, null);
  });
};


Status.findTransitionByProjectId = (projectId, result) => {
  sql.query(`SELECT * FROM transition WHERE project_id = ${projectId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("transition of the project: ", res);
    result(null, res);
  });
};

Status.findTransitionByStartStatusId = (startStatusId, result) => {
  sql.query(`SELECT * FROM transition WHERE start_status_id = ${startStatusId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("transition of the of this start status: ", res);
    result(null, res);
  });
};

Status.findNextStatusOfIssue = (issueId, result) => {
  sql.query(`select * from issue a join transition b on a.project_id = b.project_id and a.current_status_id = b.start_status_id where issue_id = ${issueId}`,
   (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("possible next statuses of the issue ", res);
    result(null, res);
  });
};

module.exports = Status;