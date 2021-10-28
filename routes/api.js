const express = require("express");
const router = express.Router();

const accountRouter = require("./account");
router.use("/account", accountRouter);

const verificationOtpRouter = require("./otp").verificationOtpRouter;
router.use("/verificationOtp", verificationOtpRouter);

const recoveryOtpRouter = require("./otp").recoveryOtpRouter;
router.use("/recoveryOtp", recoveryOtpRouter);

const taskRouter = require("./task");
router.use("/task", taskRouter);

const applicationRouter = require("./application");
router.use("/application", applicationRouter);

const inboxRouter = require("./inbox");
router.use("/inbox", inboxRouter);

module.exports = router;
