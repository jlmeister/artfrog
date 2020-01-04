const mysql = require('mysql');

const getBoardMembers = (req, res) => {
  let sql = 'SELECT ?? FROM ??';
  const replacements = ['*', 'board_members'];
  sql = mysql.format(sql, replacements);
  db.query(sql, (err, results) => {
    if (err) {
      console.log('********** ERROR REQUESTING FROM DATABASE *************');
      throw err;
    }
    console.log(results);
    res.render('about.ejs', { board: results });
  });
};

const showBoardMember = (req, res) => {
  const boardID = req.params.id;
  let sql = 'SELECT ?? from ?? where ?? = ?';
  const replacements = ['*', 'board_members', 'id', boardID];
  sql = mysql.format(sql, replacements);
  db.query(sql, (err, results) => {
    if (err) {
      console.log('********** ERROR REQUESTING FROM DATABASE *************');
      throw err;
    }
    console.log(results);
    res.render('boardEdit.ejs', { boardMember: results });
  });
};

const addBoardMember = (req, res) => {
  let sql = 'INSERT INTO ?? SET ?';
  const replacements = ['board_members', req.body];
  sql = mysql.format(sql, replacements);
  db.query(sql, (err, results) => {
    if (err) {
      console.log('********** ERROR REQUESTING FROM DATABASE *************');
      throw err;
    }
    console.log(results);
    res.render('panel.ejs');
  });
};

const editBoardMember = (req, res) => {
  let sql = 'UPDATE ?? set ? where ?? = ?';
  const replacements = ['board_members', req.body, 'id', req.params.id];
  sql = mysql.format(sql, replacements);
  db.query(sql, (err, results) => {
    if (err) {
      console.log('********** ERROR REQUESTING FROM DATABASE *************');
      throw err;
    }
    console.log(results);
    res.render('panel.ejs');
  });
};

const removeBoardMember = (req, res) => {
  let sql = 'DELETE from ?? where ?? = ?';
  const replacements = ['board_members', 'id', req.params.id];
  sql = mysql.format(sql, replacements);
  db.query(sql, (err, results) => {
    if (err) {
      console.log('********** ERROR REQUESTING FROM DATABASE *************');
      throw err;
    }
    console.log('Controller Results: ', results);
  });
};

module.exports = {
  getBoardMembers,
  showBoardMember,
  addBoardMember,
  editBoardMember,
  removeBoardMember,
};
