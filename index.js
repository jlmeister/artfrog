const express = require("express");
// const cors = require("cors");

const teachersRouter = require("./routes/teachers");

require("dotenv").config();

const PORT = process.env.PORT || 80;
const app = express();

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// app.use(cors());

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(teachersRouter);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// This works
app.get("/api/test", (req, res) => {
  res.send("hello");
});

// This does not work. -- 405 Method Error

// app.options("/api/register", cors());
app.post("/api/register", urlencodedParser, (req, res) => {
  res.send(req.body);
  // res.send("success");
  // need to take form submission and inject data into mySQL database.
  // validate and sanitize user input with { express-validator } npm package
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
