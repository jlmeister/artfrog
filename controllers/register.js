const showForm = (req, res) => {
  const classID = req.params.id;
  let query = db.query(`select * from classes where class_id=${classID}`, (err, results) => {
    if (err) throw err;
    console.log(results[0]);
    res.render('register.ejs', { class: results[0] });
  });
}

const register = (req, res) => {
  let post = req.body;
  let query = db.query("INSERT INTO students SET ?", post, error => {
    if (error) {
      console.log('********* problem with the function call *********', post);
      throw error;
    }
  });
  console.log(query.sql);

  // Input Heike's Email into array below
  let emailArr = [`${req.body.email}`, process.env.ARTFROG_EMAIL]

  // Specify what the email will look like
  const mailOpts = {
    from: "ArtFrog", // This is ignored by Gmail
    to: emailArr,
    subject: "ArtFrog Registration Complete",
    text: `Thank you ${req.body.firstName}, 

    You have registered for ClassXYZ.  Class starts on DATEXYZ at TIMEXYZ. We look forward to seeing you!

    Here is the information you provided: 
      ${req.body.firstName} ${req.body.lastName}
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

  // Attempt to send the email
  emailer.sendMail(mailOpts, (error, response) => {
    if (error) {
      res.render('success.ejs', { message: 'message', mailStatus: 'email error status' }) // Show a page indicating failure
    } else {
      res.render('success.ejs', { message: 'message', mailStatus: 'email success status' }) // Show a page indicating success
    }
  });
};
module.exports = { showForm, register };