const editTeacher = (req, res) => {
  const sql = 'SELECT * FROM teachers';
  db.query(sql, (err, results) => {
    if (err) {
      console.log('********** ERROR REQUESTING FROM DATABASE *************');
      throw err;
    }
    console.log(results);
    // res.json(results);
    res.send({ teachers: JSON.parse(JSON.stringify(results)) });
  });
};

module.exports = { editTeacher };
