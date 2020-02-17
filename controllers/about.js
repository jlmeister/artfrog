const mysql = require('mysql');

// EJS View
const getBoardMembers = (req, res) => {
  let sql = 'SELECT ?? FROM ??';
  const replacements = ['*', 'board_members'];
  sql = mysql.format(sql, replacements);
  db.query(sql, (err, results) => {
    if (err) {
      console.log('********** ERROR REQUESTING FROM DATABASE *************');
      throw err;
    }
    // console.log(results);
    res.render('about.ejs', { board: results });
  });
};

//---------------------------------------------------------------
// CMS
const getBoardCMS = (req, res) => {
  let sql = 'SELECT ?? FROM ??';
  const replacements = ['*', 'board_members'];
  sql = mysql.format(sql, replacements);
  db.query(sql, (err, results) => {
    if (err) {
      console.log('********** ERROR REQUESTING FROM DATABASE *************');
      throw err;
    }
    // console.log(results);
    res.send({ board: JSON.parse(JSON.stringify(results)) });
  });
};

const createBoardMember = (req, res) => {
  let sql = 'INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)';
  const post = req.body;
  const replacements = [
    'board_members',
    'first_name',
    'last_name',
    'bio',
    post.first_name,
    post.last_name,
    post.bio,
  ];
  sql = mysql.format(sql, replacements);
  db.query(sql, (err, results) => {
    if (err) {
      console.log('********** ERROR REQUESTING FROM DATABASE *************');
      throw err;
    }
    console.log(results);
    res.send('Success: Board Member Created');
  });
};

const editBoardMember = (req, res) => {
  let sql = 'UPDATE ?? set ? where ?? = ?';
  const replacements = ['board_members', req.body, 'id', req.body.id];
  sql = mysql.format(sql, replacements);
  db.query(sql, (err, results) => {
    if (err) {
      console.log('********** ERROR REQUESTING FROM DATABASE *************');
      throw err;
    }
    console.log(results);
    res.send('Success: Board Member Updated');
  });
};

const deleteBoardMember = (req, res) => {
  let sql = 'DELETE from ?? where ?? = ?';
  const replacements = ['board_members', 'id', req.body.id];
  sql = mysql.format(sql, replacements);
  db.query(sql, (err, results) => {
    if (err) {
      console.log('********** ERROR REQUESTING FROM DATABASE *************');
      throw err;
    }
    res.send('Success: Board Member Deleted');
  });
};

const boardQuery = (req, res) => {
  const search = req.query.q;
  console.log(search);
  let sql = 'SELECT * from ?? WHERE MATCH (??,??) against (? IN BOOLEAN MODE)';
  const replacements = [
    'board_members',
    'first_name',
    'last_name',
    `*${search}*`,
  ];
  sql = mysql.format(sql, replacements);
  db.query(sql, (err, results) => {
    if (err) {
      console.log('********** ERROR REQUESTING FROM DATABASE *************');
      throw err;
    }
    console.log(results);
    res.send({ board: JSON.parse(JSON.stringify(results)) });
  });
};

module.exports = {
  getBoardMembers,
  getBoardCMS,
  createBoardMember,
  editBoardMember,
  deleteBoardMember,
  boardQuery,
};
