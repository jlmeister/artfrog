const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const teachersRouter = require("./routes/teachers");

require("dotenv").config();

const PORT = process.env.PORT || 80;
const app = express();

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connceted to mySQL Server.");
});

app.use(cors());
app.use(jsonParser);
app.use(urlencodedParser);

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(teachersRouter);

// Post New User to Database
app.post("/api/register", (req, res) => {
  let post = req.body;
  let query = db.query("INSERT INTO testdb.students SET ?", post, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
  });
  // console.log(post);
  console.log(query.sql);
  res.send("success");

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

  let emailArr = [`${req.body.email}`, "chris@archershot.com"]

  // Specify what the email will look like
  const mailOpts = {
    from: "ArtForg", // This is ignored by Gmail
    to: emailArr,
    subject: "ArtFrog Registration Complete",
    text: `You have registered for Class.  If you need to cancel contact ArtFrog here: SomePhone
      Here is the information your provide:
      
      ${req.body.firstName} ${req.body.lastName}
      ${req.body.phone}
      ${req.body.address}
      ${req.body.email}`
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

app.post("/api/requestclass", (req, res) => {
  // class requested
  // respond with something like, "thanks for requesting a class. We will reach out to you shortly"
});

// request to be a volunteer
// POST route from volunteer form
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
    from: "Chris", // This is ignored by Gmail
    to: "archershot@hotmail.com",
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

app.post("/api/donate", (req, res) => {
  // donate via { Stripe / Paypal }
  // use axios for communicating with remote API
});

// contact us
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
    from: "Chris", // This is ignored by Gmail
    to: "archershot@hotmail.com",
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

app.post("/api/event_signup", (req, res) => {
  // sign up for event via { Eventbrite }
  // use axios for communicating with remote API
});
app.post("/api/add_class", (req, res) => {
  // add class to class list
  // { className, description, etc }
});
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
