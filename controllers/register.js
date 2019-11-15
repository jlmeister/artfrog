const moment = require('moment');

const showForm = (req, res) => {
  const classID = req.params.id;
  let query = db.query(`select * from classes where class_id=${classID}`, (err, results) => {
    if (err) throw err;
    res.render('register.ejs', { classID: classID });
  });
}

const register = (req, res) => {
  let post = req.body;
  db.query("INSERT INTO students SET ?", post, error => {
    if (error) {
      console.log('********* problem with the function call *********', post);
      throw error;
    }
  });
  db.query(`SELECT class_name, date_format(date, "%m %d %Y"), time_format(start_time, "%h %p") FROM classes where class_id=${req.body.class_id}`, (err, results) => {
    if (err) throw err;
    console.log('inside mysql email function: ', results);
    let classInfo = results[0];

    // Input Heike's Email into array below
    let emailArr = [`${req.body.email}`, process.env.ARTFROG_EMAIL]

    // moment(toString(classInfo.date)).format('DD-MM-YYYY'), moment(classInfo.start_time)
    // Specify what the email will look like
    const mailOpts = {
      from: "ArtFrog", // This is ignored by Gmail
      to: req.body.email,
      subject: "ArtFrog Art Academy - Registration Successful",
      bcc: 'iamphil4483@yahoo.com',
      text: `Thank you ${req.body.first_name}, 

      You have registered for ${classInfo.class_name}.  Class starts on ${moment(classInfo.date).format('MMM D, YYYY')} at ${classInfo.start_time}. We look forward to seeing you! 

      Here is the information you provided: 
        ${req.body.first_name} ${req.body.last_name}
        ${req.body.phone}
        ${req.body.address}
        ${req.body.email}
        
        If you need to change the above information or cancel, please contact ArtFrog here: ${process.env.ARTFROG_PHONE}

        Here is our address: 
        ArtFrog Academy 
        301 Main St., Suite 200
        Lofts of Old Oak Square / Main & 3rd)
        Marble Falls, Texas 78654, USA
      `
    };
    console.log(classInfo.start_time);
    // Attempt to send the email
    emailer.sendMail(mailOpts, (error, response) => {
      if (error) {
        res.render('success.ejs', { message: 'message', mailStatus: 'email error status' }) // Show a page indicating failure
      } else {
        res.render('success.ejs', { message: 'message', mailStatus: 'email success status' }) // Show a page indicating success
      }
    });
  })

};
module.exports = { showForm, register };