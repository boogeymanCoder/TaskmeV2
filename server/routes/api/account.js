const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const Account = require("../../models/account");
const AccountNotFoundError = require("./error").AccountNotFoundError;
const VerificationOtp = require("../../models/otp").verificationOtp;
const RecoveryOtp = require("../../models/otp").recoveryOtp;
const account = require("../../models/account");
const { verificationOtp } = require("../../models/otp");

router.get("/", (req, res) => {
  console.log("req.session:", req.session);
  console.log("req.user:", req.user);
  res.json(req.user);
});

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

router.get("/logout", (req, res) => {
  req.logout();
  res.send({ message: "Successfully Logged Out" });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log("Called login callback");
    if (err) return next(err);
    if (info) return res.json(info);
    req.login(user, (err) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      console.log("req.session:", req.session);
      console.log("req.user after login: ", req.user);
      console.log("user to be sent:", user);
      return res.json(user);
    });
  })(req, res, next);
});

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     successRedirect: "http://localhost:3000/",
//   })
// );

router.get("/id/:id", async (req, res) => {
  const account = await Account.findById(req.params.id);

  if (account === null) {
    console.log(AccountNotFoundError);
    return res.status(404).send(AccountNotFoundError);
  }

  res.json(account);
});

router.get("/email/:email", async (req, res) => {
  const account = await Account.findOne({ email: req.params.email });

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

router.get("/validate/username/:username", async (req, res) => {
  const account = await Account.findOne({ username: req.params.username });

  if (account === null) {
    return res.send(true);
  }

  res.send(false);
});

router.get("/validate/email/:email", async (req, res) => {
  const account = await Account.findOne({ email: req.params.email });

  if (account === null) {
    return res.send(true);
  }

  res.send(false);
});
// TODO add api authentication
// TODO add api authorization
router.patch("/:id", async (req, res) => {
  const account = await Account.findById(req.params.id);

  if (account === null) {
    console.log(AccountNotFoundError);
    return res.status(404).send(AccountNotFoundError);
  }

  account.username = req.body.username ? req.body.username : account.username;
  account.password = req.body.password
    ? await bcrypt.hash(req.body.password, 10)
    : account.password;
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

// FIXME is this needed?
// TODO add api authentication
// TODO add api authorization
router.delete("/:id", async (req, res) => {
  const account = await Account.findById(req.params.id);

  if (account === null) {
    console.log(AccountNotFoundError);
    return res.status(404).send(AccountNotFoundError);
  }

  await Account.findByIdAndDelete(account._id)
    .then(async () => {
      console.log("Account Deletion Successful");

      await VerificationOtp.deleteOne({ owner: account._id })
        .then(() => console.log("Otp Deletion Successful"))
        .catch((err) => console.log("Otp Deletion Failed, Cause:", err));

      await RecoveryOtp.deleteOne({ owner: account._id })
        .then(() => console.log("Otp Deletion Successful"))
        .catch((err) => console.log("Otp Deletion Failed, Cause:", err));

      // TODO remove references on delete?

      res.json(account);
    })
    .catch((err) => {
      console.log("Account Deletion Failed, Cause:", err);
      res.status(404).json(err);
    });
});

module.exports = router;
