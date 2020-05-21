const sql = require("../models/db.js");


module.exports = app => {
  
  app.post('/login', (req, res) =>{
    var user_name = req.body.user_name;
    var user_password = req.body.user_password;
    if  (user_name && user_password){
      sql.query('SELECT * FROM USER WHERE user_name = ? AND cast(AES_DECRYPT(user_password,"project") as char) = ?',
        [user_name,user_password],function(err,result,field){
          if (result.length > 0) {
            req.session.loggedin = true;
            req.session.username = user_name; 
            console.log(result)         
          } else {
            res.send('Invalid combination.');
          }
          res.end();

        });
    }else{
      res.send('Please enter Username and Password!');
      res.end();      
    } 
  });

};