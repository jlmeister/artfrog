const moment = require('moment');

const showForm = (req, res) => {
  const classID = req.params.id;
  const query = db.query(
    `select * from classes where class_id=${classID}`,
    (err, results) => {
      if (err) throw err;
      console.log(JSON.parse(JSON.stringify(results[0])));
      res.render('register.ejs', { classInfo: results[0] });
    }
  );
};

const register = (req, res) => {
  const post = req.body;
  db.query('INSERT INTO students SET ?', post, error => {
    if (error) {
      console.log('********* problem with the function call *********', post);
      throw error;
    }
  });
  db.query(
    `SELECT class_name, date, time_format(start_time, "%h:%m %p") as time FROM classes where class_id=${req.body.class_id}`,
    (err, results) => {
      if (err) throw err;
      console.log('inside mysql email function: ', results);
      const classInfo = results[0];

      // Specify what the email will look like
      const mailOpts = {
        from: 'ArtFrog', // This is ignored by Gmail
        to: req.body.email,
        subject: 'ArtFrog Art Academy - Registration Successful',
        bcc: 'iamphil4483@yahoo.com',
        text: `Thank you ${req.body.first_name}, 

      You have registered for ${
        classInfo.class_name
      }.  Class starts on ${moment(classInfo.date).format('MMM D, YYYY')} at ${
          classInfo.time
        }. We look forward to seeing you! 

      Here is the information you provided: 
        ${req.body.first_name} ${req.body.last_name}
        ${req.body.phone}
        ${req.body.address}
        ${req.body.email}
        
        If you need to change the above information or cancel, please contact ArtFrog here: ${
          process.env.ARTFROG_PHONE
        }

        Here is our address: 
        ArtFrog Academy 
        301 Main St., Suite 200
        Lofts of Old Oak Square / Main & 3rd)
        Marble Falls, Texas 78654, USA
      `,
      };
      console.log(classInfo.time);
      // Attempt to send the email
      emailer.sendMail(mailOpts, (error, response) => {
        console.log('hello?????');
        if (error) {
          res.json({ redirect: '/success/register/err' });
          // res.redirect('/success/register/err')

          // res.render('success.ejs', { message: 'message', mailStatus: 'email error status' }) // Show a page indicating failure
        } else {
          res.json({ redirect: '/success/register/success' });
          // res.redirect('/success/register/success')
          // res.render('success.ejs', { message: 'message', mailStatus: 'email success status' }) // Show a page indicating success
        }
      });
    }
  );
};
module.exports = { showForm, register };
