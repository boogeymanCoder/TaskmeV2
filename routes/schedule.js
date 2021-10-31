const express = require("express");
const router = express.Router();
const Schedule = require("../models/schedule");

router.post("/", async (req, res) => {
  const schedule = new Schedule({
    label: req.body.label,
    start: req.body.start,
    end: req.body.end,
  });

  await schedule
    .save()
    .then(() => {
      console.log("Schedule Creation Successful");
      res.json(schedule);
    })
    .catch((err) => {
      console.log("Schedule Creation Failed, Cause:", err);
      res.status(400).json(err);
    });
});

module.exports = router;
