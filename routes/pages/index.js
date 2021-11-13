const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const { authCheck } = require("../auth");

router.get("/", authCheck, (req, res) => {
  res.render("index", { account: req.user });
});

router.patch("/", authCheck, async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  axios
    .patch(
      `${req.protocol}://${req.headers.host}/api/account/${req.user._id}`,
      req.body
    )
    .then((response) => {
      req.flash("info", "Account Updated");
      req.logout();
      return res.redirect("/login");
    })
    .catch((err) => {
      req.flash("error", "Something Went Wrong");
      return res.redirect("/");
    });
});

module.exports = router;
