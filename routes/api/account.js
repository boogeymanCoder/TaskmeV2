const express = require("express");
const router = express.Router();
const Account = require("../../models/account");

router.post("/new", async (req, res) => {
  const account = new Account({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    fullname: req.body.fullname,
    address: req.body.address,
    contact: req.body.contact,
    gender: req.body.gender,
  });

  await account
    .save()
    .then(() => {
      console.log("Account Saved");
      res.json(account);
    })
    .catch((err) => {
      console.log("Account not saved, cause:", err);
      res.status(400).json(err);
    });
});

module.exports = router;
