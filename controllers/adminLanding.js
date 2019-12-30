let classes;
let teachers;

const getClasses = () =>
  new Promise((resolve, reject) => {
    const sqlClasses = 'SELECT * FROM classes';
    db.query(sqlClasses, (err, classResults) => {
      if (err) {
        console.log('********** ERROR REQUESTING FROM DATABASE *************');
        throw err;
      }
      resolve((classes = { classes: classResults }));
    });
  });

const getTeachers = () =>
  new Promise((resolve, reject) => {
    const sqlTeachers = 'SELECT * FROM teachers';
    db.query(sqlTeachers, (err, tearcherResults) => {
      if (err) {
        console.log('********** ERROR REQUESTING FROM DATABASE *************');
        throw err;
      }
      resolve((teachers = { teachers: tearcherResults }));
    });
  });

async function getLandingPage(req, res) {
  try {
    await getClasses();
    // console.log(classes);
    await getTeachers();
    // console.log(teachers);
    const dataGroup = { classes, teachers };
    await res.render('adminLanding.ejs', { dataGroup });
    console.log('DG Classes: ', dataGroup.classes);
    console.log('-----------------------------------');
    console.log('DG Teachers: ', dataGroup.teachers);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getLandingPage };
