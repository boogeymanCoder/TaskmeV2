const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Account = require("../../models/account");

router.post("/new", async (req, res) => {
  const account = new Account({
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, 10),
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

router.get("/id/:id", async (req, res) => {
  const account = await Account.findById(req.params.id);

  res.json(account);
});

router.get("/username/:username", async (req, res) => {
  const account = await Account.findOne({ username: req.params.username });

  res.json(account);
});

module.exports = router;
