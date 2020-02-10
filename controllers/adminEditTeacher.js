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

const createTeacher = (req, res) => {
  const post = req.body;
  // console.log('Post Object: ', post.first_name);

  const query = db.query(
    `INSERT INTO teachers(first_name, last_name, bio) VALUES ('${post.first_name}', '${post.last_name}', '${post.bio}')`,
    err => {
      if (err) throw err;
    }
  );
  console.log('ADD /teachers: ', query.sql);
  res.send('success'); // render to the admin panel
};

const editTeacher = (req, res) => {

}

module.exports = { editTeacher, createTeacher, edit };
