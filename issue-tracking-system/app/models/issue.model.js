const sql = require("./db.js");

const Issue = function(issue) {

  this.project_id = issue.project_id;
  this.reporter_id = issue.reporter_id;
  this.current_status_id = issue.current_status_id;
  this.issue_title = issue.issue_title;
  this.issue_description = issue.issue_description;
  this.create_date = issue.create_date;
};

function buildSearchCondition( projectId, projectTitle, ProjectDescription, issueTitle, issueDescription, status, asignee, reporter) {
  var joins = []
  var on = []
  var where = []

  var joinValues = []
  var onValues = []
  var whereValues = []


  if (projectTitle || ProjectDescription){
    var project_sql = "join (select project_id from project where";
    if (projectTitle){
      project_sql += " project_name like ?";
      joinValues.push("%" + projectTitle + "%");
    }
    if (ProjectDescription){
      project_sql += " project_description like ?";
      joinValues.push("%" + ProjectDescription + "%");
    }

    joins.push(project_sql+") b");
    on.push("a.project_id = b.project_id")
  }

  if (asignee){
    joins.push("join (select issue_id from assign_issue a join user b on a.assignee_id = b.user_id where user_alias like ?) c");
    joinValues.push("%" + asignee + "%");
    on.push("a.issue_id = c.issue_id")
  }

  if (status){
    joins.push("join (select project_id, status_id from status where status_name like ?) d");
    joinValues.push("%" + status + "%");
    on.push("a.project_id = d.project_id and a.current_status_id = d.status_id")    
  }

  if(reporter){
    joins.push("join (select user_id from user where user_alias like ?) e");
    joinValues.push("%" + reporter + "%"); 
    on.push("a.reporter_id = e.user_id")   
  }

  if (issueTitle || issueDescription){
    if (issueTitle){
      issue_sql += " a.issue_title like ?";
      whereValues.push("%" + issueTitle + "%");
    }
    if (issueDescription){
      issue_sql += " a.issue_description like ?";
      whereValues.push("%" + issueDescription + "%");
    }

    where.push(issue_sql);
  }

  where.push("cast(a.project_id as char) = ?");
  whereValues.push(projectId);

  var s = "select a.issue_id, a.project_id, a.reporter_id, a.current_status_id, a.issue_title, a.issue_description, a.create_date from issue a "+ 
    joins.join("\r\n") + (joins.length ? " ON " : "") + (joins.length ? on.join(" AND ") : "") + (where.length ? " WHERE " : "") + where.join(" AND ");
  var v = joinValues.concat(onValues, whereValues);

  return [s,v];

}

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
  sql.query("SELECT * FROM issue WHERE cast(issue_id as char) = ?",[issueId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("issueId :", issueId)
      console.log("found issue: ", res);
      result(null, res);
      return;
    }

    // not found issue with the id
    result({ kind: "not_found" }, null);
  });
};

Issue.findIssueByProjectId = (projectId, result) => {
  sql.query("SELECT * FROM issue WHERE cast(project_id as char) = ?",[projectId], function(err, res){
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("projectId :", projectId)
    console.log("query :", this.sql)        
    console.log("issues of project: ", res);
    result(null, res);
  });
};

Issue.SearchIssueTitle = (projectId, keyword, result) => {
  sql.query(`SELECT * FROM issue WHERE cast(project_id as char) = ? and issue_title like '%${keyword}%'`,
  [projectId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("projectId :", projectId)
    console.log("keyword :", keyword)
    console.log("query :", this.sql)
    console.log("result: ", res);
    result(null, res);
  });
};

Issue.SearchIssueDescription = (projectId, keyword, result) => {
  sql.query(`SELECT * FROM issue WHERE cast(project_id as char) = ? and issue_description like '%${keyword}%'`,
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

Issue.Search = (projectId, projectTitle, ProjectDescription, issueTitle, issueDescription, status, asignee, reporter, result) => {
  sql.query(...buildSearchCondition(projectId, projectTitle, ProjectDescription, issueTitle, issueDescription, status, asignee, reporter, result), function(err, res){
    if (err) { 
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("sql: ", this.sql);    
    console.log("result: ", res);
    result(null, res);
  });
};


Issue.updateIssueById = (id, issue, result) => {
  sql.query(
    "UPDATE issue SET issue_title = ?, issue_description = ?, current_status_id = ?  WHERE cast(issue_id as char) = ?",
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
  sql.query("select a.*, b.assignee_id, b.transition_id, b.done_date from issue a join issue_status_history b on a.issue_id = b.issue_id where cast(a.issue_id as char) = ?",
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
  sql.query("DELETE FROM issue WHERE cast(issue_id as char) = ?", id, (err, res) => {
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