const { default: axios } = require("axios");
const express = require("express");
const passport = require("passport");
const router = express.Router();

const { nonAuthCheck } = require("../auth");

router.all("*", nonAuthCheck);

router.get("/", (req, res) => {
  res.render("login.ejs");
});

router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/",
  })
);

module.exports = router;
