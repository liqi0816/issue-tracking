const sql = require("../models/db.js");


module.exports = app => {
  
  app.post('/login', (req, res) =>{
    var user_name = req.body.user_name;
    var user_password = req.body.user_password;
    if  (user_name && user_password){
      sql.query('SELECT * FROM USER WHERE user_name = ? AND user_password = ?',
        [user_name,user_password],(err,result,field) => {
          if (result.length > 0) {
            request.session.loggedin = true;
            request.session.username = user_name;          
          } else {
            response.send('Invalid combination.');
          }
          response.end();

        });
    }else{
      response.send('Please enter Username and Password!');
      response.end();      
    } 
  });

};