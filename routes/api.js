const express = require("express");
const router = express.Router();

const accountRouter = require("./account");
router.use("/account", accountRouter);

const verificationRouter = require("./verificationOtp");
router.use("/verificationOtp", verificationRouter);

module.exports = router;
