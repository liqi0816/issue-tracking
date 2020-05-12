const sql = require("./db.js");

const Issue = function(issue) {

  this.project_id = issue.project_id;
  this.reporter_id = issue.reporter_id;
  this.current_status_id = issue.current_status_id;
  this.issue_title = issue.issue_title;
  this.issue_description = issue.issue_description;
  this.create_date = issue.create_date;
};

Issue.createIssue = (newIssue, result) => {
  sql.query("INSERT INTO issue SET ?", newIssue, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created issue: ", { id: res.insertId, ...newIssue });
    result(null, { id: res.insertId, ...newIssue });
  });
};

Issue.findIssueById = (issueId, result) => {
  sql.query(`SELECT * FROM issue WHERE issue_id = ${issueId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found issue: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found issue with the id
    result({ kind: "not_found" }, null);
  });
};

Issue.findIssueByProjectId = (projectId, result) => {
  sql.query(`SELECT * FROM issue WHERE project_id = ${projectId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("issues of project: ", res);
    result(null, res);
  });
};

Issue.SearchIssueTitle = (projectId, keyword, result) => {
  sql.query(`SELECT * FROM issue WHERE project_id = ? and issue_title like '%${keyword}%'`,
  [projectId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("result: ", res);
    result(null, res);
  });
};

Issue.SearchIssueDescription = (projectId, keyword, result) => {
  sql.query(`SELECT * FROM issue WHERE project_id = ? and issue_description like '%${keyword}%'`,
  [projectId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("result: ", res);
    result(null, res);
  });
};


Issue.updateIssueById = (id, issue, result) => {
  sql.query(
    "UPDATE issue SET issue_title = ?, issue_description = ?, current_status_id = ?  WHERE issue_id = ?",
    [issue.issue_title, issue.issue_description, issue.current_status_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found issue with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated issue: ", { id: id, ...issue });
      result(null, { id: id, ...issue });
    }
  );
};

Issue.getIssueHistory = (issueId, result) => {
  sql.query("select a.*, b.assignee_id, b.transition_id, b.done_date from issue a join issue_status_history b on a.issue_id = b.issue_id where a.issue_id = ?",
  [issueId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("result: ", res);
    result(null, res);
  });
};

Issue.addIssueHistory = (issueId, assignee_id,transition_id, result) => {
  sql.query("INSERT INTO issue_status_history SET issue_id = ?, assignee_id = ?, transition_id = ?, done_date = NOW()",
  [issueId, assignee_id,transition_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("result: ", res);
    result(null, res);
  });
};



Issue.remove = (id, result) => {
  sql.query("DELETE FROM issue WHERE issue_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found issue with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted issue with id: ", id);
    result(null, res);
  });
};

module.exports = Issue;