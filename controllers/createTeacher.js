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

module.exports = { createTeacher };
