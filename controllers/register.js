const showForm = (req, res) => {
  res.render('register.ejs');
}

const register = (req, res) => {
  let post = req.body;
  let query = db.query("INSERT INTO artfrog.students SET ?", post, error => {
    if (error) throw error;
  });
  console.log(query.sql);

  // Input Heike's Email into array below
  let emailArr = [`${req.body.email}`, process.env.ARTFROG_EMAIL]

  // Specify what the email will look like
  const mailOpts = {
    from: "ArtFrog", // This is ignored by Gmail
    to: emailArr,
    subject: "ArtFrog Registration Complete",
    text: `You have registered for Class.  If you need to cancel, contact ArtFrog here: ${process.env.ARTFROG_PHONE}
      Here is the information your provide:
      
      ${req.body.firstName} ${req.body.lastName}
      ${req.body.phone}
      ${req.body.address}
      ${req.body.email}`
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