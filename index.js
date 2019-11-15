require('dotenv').config();
const express = require("express");
const app = express();
const mysql = require('mysql');
const nodemailer = require('nodemailer');
// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')

const stripeSecretKey = process.env.stripeSecretAPI
const stripePublicKey = 'pk_test_Vx5EcdXc8k8uz3BIIMx44laF00L79OWO9J'
console.log(stripeSecretKey)


const teachersRouter = require('./routes/teachers');
const classesRouter = require('./routes/classes');
const registerRouter = require('./routes/register');
const boardMemberRouter = require('./routes/about');

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

// Instantiate the SMTP server
const emailer = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ARTFROG_EMAIL,
    pass: process.env.ARTFROG_EMAIL_PW
  }
});
global.emailer = emailer;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(teachersRouter);
app.use(classesRouter);
app.use(registerRouter);
app.use(boardMemberRouter);

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
app.get('/contact', (req, res) => {
  res.render('contact.ejs');
})
app.get('/admin/panel', (req, res) => {
  res.render('panel.ejs');
})
app.get('/admin', (req, res) => {
  res.render('login.ejs');
})


// POST route from volunteer form to NODEMAILER ArtFrog Email
app.post("/volunteer", (req, res) => {
  // Specify what the email will look like
  const mailOpts = {
    from: "ArtFrog Academy", // This is ignored by Gmail
    to: process.env.ARTFROG_EMAIL,
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
  emailer.sendMail(mailOpts, (error, response) => {
    if (error) {
      res.render('success.ejs', { message: 'message', mailStatus: 'email error status' }) // Show a page indicating failure
    } else {
      res.render('success.ejs', { message: 'message', mailStatus: 'email success status' }) // Show a page indicating success
    }
  });
});

app.post('/donate', (req, res) => {
  // Token is created using Checkout or Elements!
  // Get the payment token ID submitted by the form:
  const token = req.body.stripeToken; // Using Express

  (async () => {
    const charge = await stripe.charges.create({
      amount: 999,
      currency: 'usd',
      description: 'Example charge',
      source: token,
    });
  })();
})

// POST route from Contact Form to NODEMAILER ArtFrog Email
app.post("/contact", (req, res) => {
  // Specify what the email will look like
  const mailOpts = {
    from: "ArtFrog Academy", // This is ignored by Gmail
    to: "process.env.ARTFROG_EMAIL",
    subject: "New message from ArtFrog Contact Form",
    text: `${req.body.firstName} ${req.body.lastName} messaged you from the ArtFrog Contact Page!

    Their contact info is: 
    Email: ${req.body.email}
    Phone: ${req.body.phone}

    Their message is:
    ${req.body.messageText}`
  };

  // Attempt to send the email
  emailer.sendMail(mailOpts, (error, response) => {
    if (error) {
      res.render('success.ejs', { message: 'message', mailStatus: 'email error status' }) // Show a page indicating failure
    } else {
      res.render('success.ejs', { message: 'message', mailStatus: 'email success status' }) // Show a page indicating success
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
