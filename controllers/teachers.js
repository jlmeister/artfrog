const getAllTeachers = (req, res) => {
  const sql = 'SELECT * FROM teachers';
  db.query(sql, (err, results) => {
    if (err) {
      console.log('********** ERROR REQUESTING FROM DATABASE *************');
      throw err;
    }
    console.log(results);
    // res.json(results);
    res.render('teachers.ejs', { teachers: results });
  });
};

const addNewTeacher = (req, res) => {
  const post = req.body;
  const query = db.query('INSERT INTO artfrog.teachers SET ?', post, err => {
    if (err) throw err;
  });
  console.log('ADD /teachers: ', query.sql);
  res.send('success'); // render to the admin panel
};

module.exports = { getAllTeachers, addNewTeacher };
