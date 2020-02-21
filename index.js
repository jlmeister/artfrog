require('dotenv').config();
const express = require('express');

const https = require('https');
const http = require('http');
const fs = require('fs');
const app = express();
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const moment = require('moment');
const cors = require('cors');

// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
// const stripe = require('stripe')('sk_test_72yoE3M4TmAYkLq7f6PTUlUP00xxhvI9r3');

const teachersRouter = require('./routes/teachers');
const classesRouter = require('./routes/classes');
const registerRouter = require('./routes/register');
const boardMemberRouter = require('./routes/about');
const studentsRouter = require('./routes/students');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB,
});

db.connect(err => {
  if (err) throw err;
  console.log('connected to mySQL Server');
});
global.db = db;

// Instantiate the SMTP server
const emailer = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.ARTFROG_EMAIL,
    pass: process.env.ARTFROG_EMAIL_PW,
  },
});
global.emailer = emailer;

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(cors());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(teachersRouter);
app.use(classesRouter);
app.use(registerRouter);
app.use(boardMemberRouter);
app.use(studentsRouter);

app.get('/', (req, res) => {
  res.render('index.ejs');
});
app.get('/about', (req, res) => {
  res.render('about.ejs');
});
app.get('/volunteer', (req, res) => {
  res.render('volunteer.ejs');
});
// app.get('/donate', (req, res) => {
//   res.render('success.ejs', { message: 'Thank you for your interest in donating.', mailStatus: 'We are looking forward to having this feature soon.' });
// })
app.get('/community', (req, res) => {
  res.render('community.ejs');
});
app.get('/contact', (req, res) => {
  res.render('contact.ejs');
});

// Admin Section
app.get('/admin/panel', (req, res) => {
  res.render('panel.ejs');
});
app.get('/admin', (req, res) => {
  res.render('login.ejs');
});

// **** REPLACE THESE WITH STANDARDIZED ROUTES AND PATH NAMES ****
app.get('/adminLanding', (req, res) => {
  res.render('adminLanding.ejs');
});
app.get('/adminAddClass', (req, res) => {
  res.send('hi');
});
app.get('/adminEditClass', (req, res) => {
  res.render('adminEditClass.ejs');
});

// POST route from volunteer form to NODEMAILER ArtFrog Email
app.post('/volunteer', (req, res) => {
  // Specify what the email will look like
  const mailOpts = {
    from: 'ArtFrog Academy', // This is ignored by Gmail
    to: process.env.ARTFROG_EMAIL,
    subject: 'New message from ArtFrog Volunteer Form',
    text: `${req.body.firstName} ${req.body.lastName} messaged you about volunteering for ArtFrog!

    Their contact info is: 
    Email: ${req.body.email}
    Phone: ${req.body.phone}

    They are interested in helping by:
    ${req.body.interest}

    Their volunteering experience is:
    ${req.body.experience}`,
  };

  // Attempt to send the email
  emailer.sendMail(mailOpts, (error, response) => {
    if (error) {
      res.redirect('/success/volunteer/err');
      // res.render('success.ejs', { message: 'message', mailStatus: 'email error status' }) // Show a page indicating failure
    } else {
      res.redirect('/success/volunteer/success');
      // res.render('success.ejs', { message: 'message', mailStatus: 'email success status' }) // Show a page indicating success
    }
  });
});

app.post('/donate', (req, res) => {
  // // Token is created using Checkout or Elements!
  // // Get the payment token ID submitted by the form:
  // const token = req.body.stripeToken; // Using Express

  // (async () => {
  //   const charge = await stripe.charges.create({
  //     amount: 999,
  //     currency: 'usd',
  //     description: 'Example charge',
  //     source: token,
  //   });
  // })();
  res.render('success.ejs');
});

// POST route from Contact Form to NODEMAILER ArtFrog Email
app.post('/contact', (req, res) => {
  // Specify what the email will look like
  const mailOpts = {
    from: 'ArtFrog Academy', // This is ignored by Gmail
    to: process.env.ARTFROG_EMAIL,
    subject: 'New message from ArtFrog Contact Form',
    text: `${req.body.firstName} ${req.body.lastName} messaged you from the ArtFrog Contact Page!

    Their contact info is: 
    Email: ${req.body.email}
    Phone: ${req.body.phone}

    Their message is:
    ${req.body.messageText}`,
  };

  // Attempt to send the email
  emailer.sendMail(mailOpts, (error, response) => {
    if (error) {
      res.redirect('/success/contact/err');
      // res.render('success.ejs', { message: 'contact', mailStatus: 'error' }) // Show a page indicating failure
    } else {
      res.redirect('/success/contact/success');
      // res.render('success.ejs', { message: 'contact', mailStatus: 'success' }) // Show a page indicating success
    }
  });
});
app.get('/success/:action/:mailStatus', (req, res) => {
  let message;
  let status;

  switch (req.params.action) {
    case 'contact':
      message = 'Thank you for reaching out!';
      break;
    case 'register':
      message = 'Thank you for registering!';
      break;
    case 'volunteer':
      message = 'Thank you for your interest in volunteering!';
      break;
    default:
      message = '';
      break;
  }
  switch (req.params.mailStatus) {
    case 'err':
      status =
        'We are having trouble sending an email to you at this time. Please reach out to us if you have any questions.';
      break;
    case 'success':
      status = 'You should receive a confirmation email shortly.';
      break;
    default:
      status = '';
      break;
  }
  res.render('success.ejs', { message, mailStatus: status });
});

app.post('/event_signup', (req, res) => {
  // sign up for event via { Eventbrite }
  // use axios for communicating with remote API
});

const httpServer = http.createServer(app);
const httpsServer = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/artfrog.org/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/artfrog.org/fullchain.pem'),
  dhparam: fs.readFileSync('/etc/ssl/certs/dhparam.pem')
}, app);

httpServer.listen(80, () => {
  console.log('HTTP Server running on port 80');
});
httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443');
});
