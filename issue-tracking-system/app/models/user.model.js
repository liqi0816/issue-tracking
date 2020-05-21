const sql = require("./db.js");

const User = function(user) {
  this.user_email = user.user_email;
  this.user_name = user.user_name;
  this.user_alias = user.user_alias;
  this.user_password = user.user_password
  this.create_date = user.create_date
};

User.createUser = (newUser, result) => {
  sql.query("INSERT INTO user SET user_email = ?, user_name = ?, user_alias = ?, user_password = AES_ENCRYPT(?, 'project'), create_date = ?", 
    [newUser.user_email,newUser.user_name,newUser.user_alias,newUser.user_password,newUser.create_date], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findUserById = (UserId, result) => {
  sql.query("SELECT * FROM user WHERE cast(user_id as char) = ?",[UserId], (err, res) => {
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

    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};

User.updateUserById = (id, user, result) => {
  sql.query(
    "UPDATE user SET user_email = ?, user_alias = ?, user_password = ?  WHERE cast(user_id as char) = ?",
    [user.user_email, user.user_alias, user.user_password, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM user WHERE cast(user_id as char) = ?", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found user with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};


User.grantLead = (grantorId, granteeId, projectId, result) => {
  sql.query("INSERT INTO grant_lead SET grantor_id = ?, grantee_id = ?, project_id = ?, grant_date = NOW()", 
    [grantorId, granteeId, projectId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created grant history: ", { grantorId : grantorId, 
      granteeId : granteeId, projectId : projectId});
    result(null, { grantorId : grantorId, 
      granteeId : granteeId, projectId : projectId});
  });  
}

User.assignIssue = (assignorId, assigneeId, issueId, result) => {
  sql.query("INSERT INTO assign_issue SET assignor_id = ?, assignee_id = ?, issue_id = ?, assign_date = NOW()", 
    [assignorId, assigneeId, issueId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created grant history: ", { assignorId : assignorId, 
      assigneeId : assigneeId, issueId : issueId});
    result(null, { assignorId : assignorId, 
      assigneeId : assigneeId, issueId : issueId});
  });  
}

User.checkIfGrantee = (granteeId, projectId, result) => {
  sql.query("SELECT * FROM grant_lead WHERE cast(grantee_id as char) = ? and cast(project_id as char) = ?",
    [granteeId, projectId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found grantee: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};

User.checkIfAssignee = (assigneeId, issueId, result) => {
  sql.query("SELECT * FROM assign_issue WHERE cast(assignee_id as char) = ? and cast(issue_id as char) = ?",
    [assigneeId, issueId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found assignee: ", res[0]);
      result(null, res[0]);
      return;
    }
    
    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = User;