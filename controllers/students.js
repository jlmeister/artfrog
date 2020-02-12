const mysql = require('mysql');

// CMS SubSection
const getAllStudents = (req, res) => {
  let sql = 'SELECT ?? FROM ??';
  const replacements = ['*', 'students'];
  sql = mysql.format(sql, replacements);
  db.query(sql, (err, results) => {
    if (err) {
      console.log('********** ERROR REQUESTING FROM DATABASE *************');
      throw err;
    }
    // console.log(results);
    res.send({ students: JSON.parse(JSON.stringify(results)) });
  });
};

const editStudent = (req, res) => {
  let sql = 'UPDATE ?? set ? where ?? = ?';
  const replacements = ['students', req.body, 'id', req.body.id];
  sql = mysql.format(sql, replacements);
  db.query(sql, (err, results) => {
    if (err) {
      console.log('********** ERROR REQUESTING FROM DATABASE *************');
      throw err;
    }
    console.log(results);
    res.send('Success: Student Updated');
  });
};

const deleteStudent = (req, res) => {
  let sql = 'DELETE from ?? where ?? = ?';
  const replacements = ['students', 'id', req.body.id];
  sql = mysql.format(sql, replacements);
  db.query(sql, (err, results) => {
    if (err) {
      console.log('********** ERROR REQUESTING FROM DATABASE *************');
      throw err;
    }
    console.log('Controller Results: ', results);
    res.send('Success: Student Deleted');
  });
};

module.exports = {
  getAllStudents,
  editStudent,
  deleteStudent,
};
