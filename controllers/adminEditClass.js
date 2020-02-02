const editClass = (req, res) => {
  const sql = 'SELECT * FROM classes';
  db.query(sql, (err, results) => {
    if (err) {
      console.log('********** ERROR REQUESTING FROM DATABASE *************');
      throw err;
    }
    console.log(results);
    // res.json(results);
    res.send({ classes: JSON.parse(JSON.stringify(results)) });
  });
};

module.exports = { editClass };
