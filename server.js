if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const flash = require("express-flash");
const methodOverride = require("method-override");

const initializePassport = require("./routes/passport-config");
const apiRouter = require("./routes/api");
const pagesRouter = require("./routes/pages");

// set up mongodb connection
mongoose.connect(process.env.DATABASE_URL);
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(expressLayouts);
app.use(flash());
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);

app.use("/api", apiRouter);
app.use("/", pagesRouter);

app.listen(process.env.PORT, () =>
  console.log("Listening at port", process.env.PORT)
);
