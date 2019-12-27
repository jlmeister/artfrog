const getLandingPage = async (req, res) => {
  let classes = {};
  let teachers = {};

  const sqlClasses = 'SELECT * FROM classes';
  await db.query(sqlClasses, (err, classResults) => {
    if (err) {
      console.log('********** ERROR REQUESTING FROM DATABASE *************');
      throw err;
    }
    console.log(classResults);
    // res.json(results);
    classes = { classes: classResults };
  });

  const sqlTeachers = 'SELECT * FROM teachers';
  await db.query(sqlTeachers, (err, teacherResults) => {
    if (err) {
      console.log('********** ERROR REQUESTING FROM DATABASE *************');
      throw err;
    }
    console.log(teacherResults);
    // res.json(results);
    teachers = { teachers: teacherResults };
  });

  res.render('adminLanding.ejs', classes, teachers);
};

module.exports = { getLandingPage };
