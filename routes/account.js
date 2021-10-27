const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Account = require("../models/account");
const AccountNotFoundError = require("./error").AccountNotFoundError;

router.post("/", async (req, res) => {
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
      console.log("Account Created");
      res.json(account);
    })
    .catch((err) => {
      console.log("Account Not Created, Cause:", err);
      res.status(400).json(err);
    });
});

router.get("/id/:id", async (req, res) => {
  const account = await Account.findById(req.params.id);

  if (account === null) {
    console.log(AccountNotFoundError);
    return res.status(404).send(AccountNotFoundError);
  }

  res.json(account);
});

router.get("/username/:username", async (req, res) => {
  const account = await Account.findOne({ username: req.params.username });

  if (account === null) {
    console.log(AccountNotFoundError);
    return res.status(404).send(AccountNotFoundError);
  }

  res.json(account);
});

// TODO add api authentication
router.patch("/:id", async (req, res) => {
  const account = await Account.findById(req.params.id);

  if (account === null) {
    console.log(AccountNotFoundError);
    return res.status(404).send(AccountNotFoundError);
  }

  account.username = req.body.username ? req.body.username : account.username;
  account.password = req.body.password ? req.body.password : account.password;
  account.email = req.body.email ? req.body.email : account.email;
  account.fullname = req.body.fullname ? req.body.fullname : account.fullname;
  account.address = req.body.address ? req.body.address : account.address;
  account.contact = req.body.contact ? req.body.contact : account.contact;
  account.gender = req.body.gender ? req.body.gender : account.gender;

  await account
    .save()
    .then(() => {
      console.log("Account Update Successful");
      res.json(account);
    })
    .catch((err) => {
      console.log("Account Update Failed, Cause:", err);
      res.status(404).json(err);
    });
});

// TODO add api authentication
router.delete("/:id", async (req, res) => {
  const account = await Account.findById(req.params.id);

  if (account === null) {
    console.log(AccountNotFoundError);
    return res.status(404).send(AccountNotFoundError);
  }

  await account
    .delete()
    .then(() => {
      console.log("Account Deletion Successful");
      res.json(account);
    })
    .catch((err) => {
      console.log("Account Deletion Failed, Cause:", err);
      res.status(404).json(err);
    });
});

module.exports = router;