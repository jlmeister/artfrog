const mysql = require('mysql');
const connection = mysql.createConnection(
  // 'mysql://artfrog:myFrogg3r!@localhost/test_db'
  // OR an object:
    {
  user: 'artfrog',
  password: 'myFrogg3r!',
  database: 'test_db'
  // host: '34.67.155.32',
  // user: 'root',
  // password: 'uKIccPDPoo02g9yO',
  // database: 'express_mysql_testing'
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});
// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//   if (err)
//     throw err;
//   console.log('The solution is: ', rows[0].solution);
// })
connection.query("INSERT INTO teachers (first_name, last_name, bio) VALUES ('first', 'last', 'A poor boy from a poor family. Easy come, easy go.');", function (err, rows, fields) {
  if (err)
    throw err;
})

connection.end();