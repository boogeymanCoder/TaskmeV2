const express = require("express");
const router = express.Router();
const Schedule = require("../../models/schedule");
const ScheduleNotFoundError = require("./error").ScheduleNotFoundError;

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

router.get("/:id", async (req, res) => {
  const schedule = await Schedule.findById(req.params.id);

  if (schedule === null) {
    console.log(ScheduleNotFoundError);
    return res.status(404).send(ScheduleNotFoundError);
  }

  res.json(schedule);
});

router.patch("/:id", async (req, res) => {
  const schedule = await Schedule.findById(req.params.id);

  if (schedule === null) {
    console.log(ScheduleNotFoundError);
    return res.status(404).send(ScheduleNotFoundError);
  }

  schedule.label = req.body.label ? req.body.label : schedule.label;
  schedule.start = req.body.start ? req.body.start : schedule.start;
  schedule.end = req.body.end ? req.body.end : schedule.end;

  await schedule
    .save()
    .then(() => {
      console.log("Schedule Update Successful");
      res.json(schedule);
    })
    .catch((err) => {
      console.log("Schedule Update Failed, Cause:", err);
      res.status(400).json(err);
    });
});

router.delete("/:id", async (req, res) => {
  const schedule = await Schedule.findById(req.params.id);

  if (schedule === null) {
    console.log(ScheduleNotFoundError);
    return res.status(404).send(ScheduleNotFoundError);
  }

  await Schedule.findByIdAndDelete(req.params.id)
    .then(() => {
      console.log("Schedule Deletion Successful");
      res.json(schedule);
    })
    .catch((err) => {
      console.log("Schedule Deletion Failed, Cause:", err);
      res.status(400).json(err);
    });
});

module.exports = router;
