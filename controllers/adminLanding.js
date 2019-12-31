let classes;
let teachers;

const getClasses = () =>
  new Promise((resolve, reject) => {
    const sqlClasses = 'SELECT * FROM classes';
    db.query(sqlClasses, (err, classResults) => {
      if (err) {
        console.log('********** ERROR REQUESTING FROM DATABASE *************');
        reject(err);
      }
      resolve({ classes: classResults });
    });
  });

const getTeachers = () =>
  new Promise((resolve, reject) => {
    const sqlTeachers = 'SELECT * FROM teachers';
    db.query(sqlTeachers, (err, tearcherResults) => {
      if (err) {
        console.log('********** ERROR REQUESTING FROM DATABASE *************');
        reject(err);
      }
      resolve({ teachers: tearcherResults });
    });
  });

async function getLandingPage(req, res) {
  try {
    const dataGroup = await Promise.all([getClasses(), getTeachers()]).then(
      data => ({
        classes: JSON.parse(JSON.stringify(data[0].classes)),
        teachers: JSON.parse(JSON.stringify(data[1].teachers)),
      })
    );

    await res.render('adminLanding.ejs', { dataGroup });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getLandingPage };
