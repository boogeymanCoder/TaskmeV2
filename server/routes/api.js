const express = require("express");
const router = express.Router();

// FIXME add put api for models with array fields
// TODO check authorization with jwt
// TODO check authentication to private routes

const accountRouter = require("./api/account");
router.use("/account", accountRouter);

const verificationOtpRouter = require("./api/otp").verificationOtpRouter;
router.use("/verificationOtp", verificationOtpRouter);

const recoveryOtpRouter = require("./api/otp").recoveryOtpRouter;
router.use("/recoveryOtp", recoveryOtpRouter);

const taskRouter = require("./api/task");
router.use("/task", taskRouter);

const applicationRouter = require("./api/application");
router.use("/application", applicationRouter);

const inboxRouter = require("./api/inbox");
router.use("/inbox", inboxRouter);

const conversationRouter = require("./api/conversation");
router.use("/conversation", conversationRouter);

const messageRouter = require("./api/message");
router.use("/message", messageRouter);

const postRouter = require("./api/post");
router.use("/post", postRouter);

const commentRouter = require("./api/comment");
router.use("/comment", commentRouter);

const serviceRouter = require("./api/service");
router.use("/service", serviceRouter);

const offerRouter = require("./api/offer");
router.use("/offer", offerRouter);

const scheduleRouter = require("./api/schedule");
router.use("/schedule", scheduleRouter);

const appointmentRouter = require("./api/appointment");
router.use("/appointment", appointmentRouter);

const notificationRouter = require("./api/notification");
router.use("/notification", notificationRouter);

const rateRouter = require("./api/rate");
router.use("/rate", rateRouter);

const ratingRouter = require("./api/rating");
router.use("/rating", ratingRouter);

module.exports = router;
