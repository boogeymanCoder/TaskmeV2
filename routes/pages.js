const express = require("express");
const router = express.Router();

const indexRouter = require("./pages/index");
const loginRouter = require("./pages/login");
const registerRouter = require("./pages/register");

router.use("/", indexRouter);
router.use("/login", loginRouter);
router.use("/register", registerRouter);

module.exports = router;
