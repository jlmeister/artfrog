const getAllClasses = (req, res) => {
  const sql = 'SELECT * FROM classes';
  db.query(sql, (err, results) => {
    if (err) {
      console.log('********** ERROR REQUESTING FROM DATABASE *************');
      throw err;
    }
    console.log(results);
    // res.json(results);
    res.render('adminLanding.ejs', { classes: results });
  });
};

const getAllTeachers = (req, res) => {
  const sql = 'SELECT * FROM teachers';
  db.query(sql, (err, results) => {
    if (err) {
      console.log('********** ERROR REQUESTING FROM DATABASE *************');
      throw err;
    }
    console.log(results);
    // res.json(results);
    res.render('adminLanding.ejs', { teachers: results });
  });
};

module.exports = { getAllClasses, getAllTeachers };
