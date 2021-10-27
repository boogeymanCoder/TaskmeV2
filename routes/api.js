const express = require("express");
const router = express.Router();

const accountRouter = require("./account");
router.use("/account", accountRouter);

const verificationOtpRouter =
  require("./verificationOtp").verificationOtpRouter;
router.use("/verificationOtp", verificationOtpRouter);

const recoveryOtpRouter = require("./verificationOtp").recoveryOtpRouter;
router.use("/recoveryOtp", recoveryOtpRouter);

module.exports = router;
