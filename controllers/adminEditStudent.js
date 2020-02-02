const editStudent = (req, res) => {
  const sql = 'SELECT * FROM students';
  db.query(sql, (err, results) => {
    if (err) {
      console.log('********** ERROR REQUESTING FROM DATABASE *************');
      throw err;
    }
    console.log(results);
    // res.json(results);
    res.send({ students: JSON.parse(JSON.stringify(results)) });
  });
};

module.exports = { editStudent };
