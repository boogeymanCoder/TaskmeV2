const express = require("express");
const router = express.Router();
const Otp = require("../models/otp").verificationOtp;
const RecoveryOtpNotFoundError = require("./error").RecoveryOtpNotFoundError;

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

router.get("/id/:id", async (req, res) => {
  const otp = await Otp.findById(req.params.id);

  res.json(await otp.populate("owner"));
});

router.get("/pin/:pin", async (req, res) => {
  const otp = await Otp.findOne({ pin: req.params.pin });

  res.json(await otp.populate("owner"));
});

router.delete("/:id", async (req, res) => {
  const otp = await Otp.findById(req.params.id);

  if (otp === null) {
    console.log(RecoveryOtpNotFoundError);
    return res.status(404).send(RecoveryOtpNotFoundError);
  }

  await otp
    .delete()
    .then(() => {
      console.log("Otp Deletion Successful");
      res.json(otp);
    })
    .catch((err) => {
      console.log("Otp Deletion Failed, Cause:", err);
      res.status(400).send(err);
    });
});

module.exports = router;
