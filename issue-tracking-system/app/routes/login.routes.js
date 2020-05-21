const sql = require("../models/db.js");


module.exports = app => {

  app.post('/login', (req, res) => {
    var user_name = req.body.user_name;
    var user_password = req.body.user_password;
    if (user_name && user_password) {
      sql.query('SELECT * FROM USER WHERE user_name = ? AND user_password =  CAST(? AS BINARY(60))',
        [user_name, user_password], (err, result, field) => {
          if (result.length === 1) {
            req.session.loggedin = true;
            req.session.user_name = user_name;
            req.session.user_id = user_id;
            res.send(JSON.stringify(result[0]));
          }
          else if (result.length > 1) {
            res.status(500).send('Duplicate user.');
          }
          else {
            res.status(401).send('Invalid combination.');
          }
        });
    } else {
      res.status(400).send('Please enter Username and Password!');
      res.end();
    }
  });

  app.get('/me', (req, res) => {
    if (!req.session) return res.status(401).end();

    const { user_name, user_id } = req.session;
    if (!user_name || !user_id) return res.status(500).end();

    return res.send({ user_name, user_id });
  });
};