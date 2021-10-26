const express = require("express");
const router = express.Router();

const accountRouter = require("./account");
router.use("/account", accountRouter);

router.get("/", (req, res) => res.send("API!"));

module.exports = router;
