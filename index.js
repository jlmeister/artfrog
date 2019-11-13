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
app.post('/volunteer', (req, res) => {
  // request to be a volunteer
  // respond with something like, "thanks for volunteering. We will reach out to you shortly"
})
app.post('/donate', (req, res) => {
  // donate via { Stripe / Paypal }
  // use axios for communicating with remote API
})
app.post('/contact', (req, res) => {
  // contact us
  // Heike said she didn't want a billion emails in her inbox, but maybe for now we just use nodemailer to send emails.
})
app.post('/event_signup', (req, res) => {
  // sign up for event via { Eventbrite }
  // use axios for communicating with remote API
})
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
