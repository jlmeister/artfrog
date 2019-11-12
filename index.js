const express = require("express");
const cors = require("cors");

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
  res.send('success')
});

app.post("/api/requestclass", (req, res) => {
  // class requested
  // respond with something like, "thanks for requesting a class. We will reach out to you shortly"
});
app.post("/api/volunteer", (req, res) => {
  // request to be a volunteer
  // respond with something like, "thanks for volunteering. We will reach out to you shortly"
});
app.post("/api/donate", (req, res) => {
  // donate via { Stripe / Paypal }
  // use axios for communicating with remote API
});
app.post("/api/contact", (req, res) => {
  // contact us
  // Heike said she didn't want a billion emails in her inbox, but maybe for now we just use nodemailer to send emails.
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
