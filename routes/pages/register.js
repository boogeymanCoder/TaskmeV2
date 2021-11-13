const express = require("express");
const router = express.Router();
const { default: axios } = require("axios");

const { nonAuthCheck } = require("../auth");

router.all("*", nonAuthCheck);

router.get("/", (req, res) => {
  res.render("register.ejs");
});

router.post("/", (req, res) => {
  console.log(req.headers.host);
  axios
    .get(
      `${req.protocol}://${req.headers.host}/api/account/validate/username/${req.body.username}`
    )
    .then((response) => {
      console.log(response.data);
      if (!response.data) {
        req.flash("error", "Username Unavailable");
        return res.redirect("/register");
      }
    })
    .catch((err) => {
      console.log("Username Validation Failed, Cause:", err);
      req.flash("error", "Username Validation Failed");
      return res.redirect("/register");
    });

  axios
    .get(
      `${req.protocol}://${req.headers.host}/api/account/validate/email/${req.body.email}`
    )
    .then((response) => {
      console.log(response.data);
      if (!response.data) {
        req.flash("error", "Email Unavailable");
        return res.redirect("/register");
      }
    })
    .catch((err) => {
      console.log("Email Validation Failed, Cause:", err);
      req.flash("error", "Email Validation Failed");
      return res.redirect("/register");
    });

  if (req.body.gender !== "Male" && req.body.gender !== "Female") {
    req.flash("error", "Invalid Gender");
    return res.redirect("/register");
  }

  axios
    .post(`${req.protocol}://${req.headers.host}/api/account/`, req.body)
    .then((response) => {
      console.log(response.data);
      req.flash("info", "Successfully Registered, Please Login");
      return res.redirect("/login");
    })
    .catch((err) => {
      console.log("Registration Failed, Cause:", err.message);
      return res.redirect("/register");
    });
});

module.exports = router;
