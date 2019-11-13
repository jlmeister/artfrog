require('dotenv').config();
const express = require("express");
const app = express();
const mysql = require('mysql');

const teachersRouter = require('./routes/teachers');
const classesRouter = require('./routes/classes');

const PORT = process.env.PORT || 80;
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB
});

db.connect(err => {
  if (err) throw err;
  console.log('connected to mySQL Server');
});
global.db = db;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(teachersRouter);
app.use(classesRouter);

app.get('/', (req, res) => {
  res.render('index.ejs');
})
app.get('/about', (req, res) => {
  res.render('about.ejs');
})
app.get('/volunteer', (req, res) => {
  res.render('volunteer.ejs');
})
app.get('/donate', (req, res) => {
  res.render('donate.ejs');
})
app.get('/community', (req, res) => {
  res.render('community.ejs');
})
app.get('/admin/panel', (req, res) => {
  res.render('panel.ejs');
})
app.get('/admin', (req, res) => {
  res.render('login.ejs');
})
app.get('/register', (req, res) => {
  res.render('register.ejs');
})

// New User Route to STUDENTS TABLE from Registration Form
app.post('/api/register', (req, res) => {
  let post = req.body;
  let query = db.query("INSERT INTO artfrog.students SET ?", post, error => {
    if (error) throw error;
  });
  // console.log(post);
  console.log(query.sql);
  res.send('success'); // redirect to donate page with success message
})


app.post('/requestclass', (req, res) => {
  // class requested
  // respond with something like, "thanks for requesting a class. We will reach out to you shortly"
})


// POST route from volunteer form to NODEMAILER ArtFrog Email
app.post("/api/volunteer", (req, res) => {
  // Instantiate the SMTP server
  const smtpTrans = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "",
      pass: ""
    }
  });

  // Specify what the email will look like
  const mailOpts = {
    from: "ArtFrog Academy", // This is ignored by Gmail
    to: "artfrogemailhere",
    subject: "New message from ArtFrog Volunteer Form",
    text: `${req.body.firstName} ${req.body.lastName} messaged you about volunteering for ArtFrog!

    Their contact info is: 
    Email: ${req.body.email}
    Phone: ${req.body.phone}

    They are interested in helping by:
    ${req.body.interest}

    Their volunteering experience is:
    ${req.body.experience}`
  };

  // Attempt to send the email
  smtpTrans.sendMail(mailOpts, (error, response) => {
    if (error) {
      res.send("error");
      // res.render('contact-failure') // Show a page indicating failure
    } else {
      res.send("success");
      // res.render('contact-success') // Show a page indicating success
    }
  });
});

app.post('/donate', (req, res) => {
  // donate via { Stripe / Paypal }
  // use axios for communicating with remote API
})

// POST route from Contact Form to NODEMAILER ArtFrog Email
app.post("/api/contact", (req, res) => {
  // Instantiate the SMTP server
  const smtpTrans = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "",
      pass: ""
    }
  });

  // Specify what the email will look like
  const mailOpts = {
    from: "ArtFrog Academy", // This is ignored by Gmail
    to: "artfrogemailhere",
    subject: "New message from ArtFrog Contact Form",
    text: `${req.body.firstName} ${req.body.lastName} messaged you from the ArtFrog Contact Page!

    Their contact info is: 
    Email: ${req.body.email}
    Phone: ${req.body.phone}

    Their message is:
    ${req.body.messageText}`
  };

  // Attempt to send the email
  smtpTrans.sendMail(mailOpts, (error, response) => {
    if (error) {
      res.send("error");
      // res.render('contact-failure') // Show a page indicating failure
    } else {
      res.send("success");
      // res.render('contact-success') // Show a page indicating success
    }
  });
});

app.post('/event_signup', (req, res) => {
  // sign up for event via { Eventbrite }
  // use axios for communicating with remote API
})
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
