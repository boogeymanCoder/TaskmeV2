if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");

const initializePassport = require("./routes/passport-config");
const apiRouter = require("./routes/api");

// set up mongodb connection
mongoose.connect(process.env.DATABASE_URL);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Have Node serve the files for our built React app
app.use(express.static(__dirname + "/client/build"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);

app.use("/api", apiRouter);

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(__dirname + "../client/build/index.html");
});

app.listen(process.env.PORT, () =>
  console.log("Listening at port", process.env.PORT)
);
