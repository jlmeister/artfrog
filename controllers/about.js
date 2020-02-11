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
    console.log(results);
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
    console.log(results);
    res.send({ board: JSON.parse(JSON.stringify(results)) });
  });
};

const createBoardMember = (req, res) => {
  const post = req.body;
  // console.log('Post Object: ', post.first_name);

  const query = db.query(
    `INSERT INTO board_members(first_name, last_name, bio) VALUES ('${post.first_name}', '${post.last_name}', '${post.bio}')`,
    err => {
      if (err) throw err;
    }
  );
  // console.log('ADD /about: ', query.sql);
  res.send('Success: Board Member Created');
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

module.exports = {
  getBoardMembers,
  getBoardCMS,
  createBoardMember,
  editBoardMember,
  deleteBoardMember,
};
