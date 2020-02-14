const mysql = require('mysql')

const getAllClasses = (req, res) => {
  const sql = 'SELECT * FROM classes';
  db.query(sql, (err, results) => {
    if (err) {
      console.log('********** ERROR REQUESTING FROM DATABASE *************');
      throw err;
    }
    console.log(results);
    // res.json(results);
    res.render('classes.ejs', { classes: results });
  });
};

// ---------------------------------------------------------------------------------

// CMS SubSection
const getAllClassesCMS = (req, res) => {
  let sql = 'SELECT ?? FROM ??';
  const replacements = ['*', 'classes'];
  sql = mysql.format(sql, replacements);
  db.query(sql, (err, results) => {
    if (err) {
      console.log('********** ERROR REQUESTING FROM DATABASE *************');
      throw err;
    }
    // console.log(results);
    res.send({ classes: JSON.parse(JSON.stringify(results)) });
  });
};

module.exports = {
  getAllClasses,
  getAllClassesCMS,
};
