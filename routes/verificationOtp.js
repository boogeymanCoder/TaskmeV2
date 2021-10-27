const express = require("express");
const router = express.Router();
const Otp = require("../models/otp").verificationOtp;

router.post("/", async (req, res) => {
  const otp = new Otp({
    pin: req.body.pin,
    owner: req.body.owner,
    expiration: req.body.expiration,
  });

  await otp
    .save()
    .then(async () => {
      console.log("Otp Creation Successful");
      res.json(await otp.populate("owner"));
    })
    .catch((err) => {
      console.log("Otp Creation Failed, Cause:", err);
      res.status(404).json(err);
    });
});

module.exports = router;
