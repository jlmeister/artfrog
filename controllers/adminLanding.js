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

const getStudents = () =>
  new Promise((resolve, reject) => {
    const sqlStudents = 'SELECT * FROM students';
    db.query(sqlStudents, (err, studentResults) => {
      if (err) {
        console.log('********** ERROR REQUESTING FROM DATABASE *************');
        reject(err);
      }
      resolve({ students: studentResults });
    });
  });

const getBoardMembers = () =>
  new Promise((resolve, reject) => {
    const sqlBoard = 'SELECT * FROM board_members';
    db.query(sqlBoard, (err, boardResults) => {
      if (err) {
        console.log('********** ERROR REQUESTING FROM DATABASE *************');
        reject(err);
      }
      resolve({ board: boardResults });
    });
  });

async function getLandingPage(req, res) {
  try {
    const dataGroup = await Promise.all([
      getClasses(),
      getTeachers(),
      getStudents(),
      getBoardMembers(),
    ]).then(data => ({
      classes: JSON.parse(JSON.stringify(data[0].classes)),
      teachers: JSON.parse(JSON.stringify(data[1].teachers)),
      students: JSON.parse(JSON.stringify(data[2].students)),
      board: JSON.parse(JSON.stringify(data[3].board)),
    }));
    // console.log(dataGroup);
    await res.render('adminLanding.ejs', { dataGroup });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getLandingPage };
