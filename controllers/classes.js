const mysql = require('mysql');
require('dotenv').config();

const creds = {
    host: '127.0.0.1',
    user: 'root',
    password: 'projectx1',
    database: 'testdb'
  // user: process.env.DB_USER,
  // password: process.env.DB_PW,
  // database: process.env.DB
};

let obj = {}

const list = (req, res) => {
  const connection = mysql.createConnection(creds);

  connection.connect(function (err) {
    if (err) {
      console.log('********** ERROR CONNECTING TO DATABASE *************');
      throw err;
    }
    console.log('connected..');
  })

  let sql = 'SELECT * FROM classes';
  connection.query(sql, (err, results) => {
    if (err) {
      console.log('********** ERROR REQUESTING FROM DATABASE *************');
      throw err;
    }
    // console.log(results);
    // res.json(results);

    //EJS code below:
    res.render('classes.ejs', {
      classes: results
  });
    //___________________________________________________________________
  })
  connection.end();
};

const add = (req, res) => {
  const connection = mysql.createConnection(creds);

  connection.connect(function (err) {
    if (err) {
      console.log('********** ERROR CONNECTING TO DATABASE *************');
      throw err;
    }
    console.log('connected..');
  })

  // console.log(req.body);
  let sql = `INSERT INTO classes (class_name, class_time, description) VALUES ('${req.body.name}', '${req.body.time}', '${req.body.description}');`;

  connection.query(sql, (err) => {
    if (err) {
      console.log('********** ERROR REQUESTING FROM DATABASE *************');
      throw err;
    }
    res.send('success');
  })
  connection.end();
};

module.exports = { list, add };