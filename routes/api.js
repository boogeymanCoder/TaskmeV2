const express = require("express");
const router = express.Router();

// TODO check authorization with jwt

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

const conversationRouter = require("./conversation");
router.use("/conversation", conversationRouter);

const messageRouter = require("./message");
router.use("/message", messageRouter);

const postRouter = require("./post");
router.use("/post", postRouter);

const commentRouter = require("./comment");
router.use("/comment", commentRouter);

module.exports = router;
