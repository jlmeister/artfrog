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

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(teachersRouter);

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,OPTIONS,POST",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// This works
app.get("/api/test", (req, res) => {
  res.send("hello");
});

// This does not work. -- 405 Method Error

// app.options("https://crossorigin.me//api/register", cors());
app.post("/api/register", (req, res) => {
  res.send('hi')
  // let post = req.body;
  // let sql = "INSERT INTO students SET ?";
  // let query = db.query(sql, post, (err, result) => {
  //   if (err) throw err;
  //   console.log(result);
  //   res.send("user added");
  });

  // res.send("success");
  // let username=req.body.name;
  //   connection.query("INSERT INTO `users` (name) VALUES ()", username.toString(), function(err, result){
  //       if(err) throw err;
  //           console.log("1 record inserted");
  //       });
  //   res.send(username);
  // need to take form submission and inject data into mySQL database.
  // validate and sanitize user input with { express-validator } npm package

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
