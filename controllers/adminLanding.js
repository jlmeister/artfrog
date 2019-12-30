let classes = {};
let teachers = {};

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
  const data = [];
  try {
    await getClasses();
    console.log(classes);
    await getTeachers();
    console.log(teachers);
    console.log(data);
    await res.render('adminLanding.ejs', data);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getLandingPage };
