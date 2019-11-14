const getBoardMembers = (req, res) => {
  let sql = 'SELECT * FROM board_members';
  db.query(sql, (err, results) => {
    if (err) {
      console.log('********** ERROR REQUESTING FROM DATABASE *************');
      throw err;
    }
    console.log(results);
    // res.json(results);
    res.render('about.ejs', { board: results });
  })
};

module.exports = { getBoardMembers };