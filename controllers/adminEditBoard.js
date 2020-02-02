const editBoard = (req, res) => {
  const sql = 'SELECT * FROM board_members';
  db.query(sql, (err, results) => {
    if (err) {
      console.log('********** ERROR REQUESTING FROM DATABASE *************');
      throw err;
    }
    console.log(results);
    // res.json(results);
    res.send({ board: JSON.parse(JSON.stringify(results)) });
  });
};

module.exports = { editBoard };
