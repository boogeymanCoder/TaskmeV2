const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const TaskNotFoundError = require("./error").TaskNotFoundError;

// TODO add api authentication
router.post("/", async (req, res) => {
  const task = new Task({
    employer: req.body.employer,
    name: req.body.name,
    location: req.body.location,
    skill: req.body.skill,
    date: req.body.date,
    open: req.body.open,
  });

  await task
    .save()
    .then(async () => {
      console.log("Task Creation Successful");
      res.json(await task.populate("employer"));
    })
    .catch((err) => {
      console.log("Task Creation Failed, Cause:", err);
      res.status(400).json(err);
    });
});

// TODO add api authentication
router.get("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task === null) {
    console.log(TaskNotFoundError);
    return res.status(404).json(TaskNotFoundError);
  }

  res.json(await task.populate("employer"));
});

// TODO add api authentication
router.patch("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task === null) {
    console.log(TaskNotFoundError);
    return res.status(404).json(TaskNotFoundError);
  }

  task.employer = req.body.employer ? req.body.employer : task.employer;
  task.name = req.body.name ? req.body.name : task.name;
  task.location = req.body.location ? req.body.location : task.location;
  task.skill = req.body.skill ? req.body.skill : task.skill;
  task.date = req.body.date ? req.body.date : task.date;
  task.open = req.body.open ? req.body.open : task.open;

  await task
    .save()
    .then(async () => {
      console.log("Task Update Successful");
      res.json(await task.populate("employer"));
    })
    .catch((err) => {
      console.log("Task Update Failed, Cause:", err);
      res.status(400).json(err);
    });
});

// TODO add api authentication
router.delete("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task === null) {
    console.log(TaskNotFoundError);
    return res.status(404).json(TaskNotFoundError);
  }

  await Task.findByIdAndDelete(req.params.id)
    .then(() => {
      console.log("Task Delete Successful");
      res.json(task);
    })
    .catch((err) => {
      console.log("Task Delete Failed, Cause:", err);
      res.status(400).json(err);
    });
});

module.exports = router;