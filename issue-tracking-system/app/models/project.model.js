const sql = require("./db.js");

const Project = function(project) {
  this.creator_id = project.creator_id;
  this.project_name = project.project_name;
  this.project_description = project.project_description;
  this.create_date = project.create_date
};

Project.createProject = (newProject, result) => {
  sql.query("INSERT INTO project SET ?", newProject, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created project: ", { id: res.insertId, ...newProject });
    result(null, { id: res.insertId, ...newProject });
  });
};

Project.findProjectById = (projectId, result) => {
  sql.query("SELECT * FROM project WHERE cast(project_id as char) = ?",[projectId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found project with the id
    result({ kind: "not_found" }, null);
  });
};

Project.updateProjectById = (id, project, result) => {
  sql.query(
    "UPDATE project SET project_name = ?, project_description = ?  WHERE cast(project_id as char) = ?",
    [project.project_name, project.project_description, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found project with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated project: ", { id: id, ...project });
      result(null, { id: id, ...project });
    }
  );
};

Project.remove = (id, result) => {
  sql.query("DELETE FROM project WHERE cast(project_id as char) = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found project with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted project with id: ", id);
    result(null, res);
  });
};

Project.getUserProjects = (userId , result) => {
  sql.query("select project_id from project where cast(creator_id as char) = ? union select project_id from grant_lead where cast(grantee_id as char) = ?;",
    [userId, userId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("projects involved: ", res);
    result(null, res);

  });
};


module.exports = Project;