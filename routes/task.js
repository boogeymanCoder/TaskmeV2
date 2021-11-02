const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const TaskNotFoundError = require("./error").TaskNotFoundError;

router.post("/", async (req, res) => {
  const task = new Task({
    employer: req.body.employer,
    name: req.body.name,
    details: req.body.details,
    tags: req.body.tags,
    location: req.body.location,
    skill: req.body.skill,
    date: req.body.date,
    open: req.body.open,
    currency: req.body.currency,
    price: req.body.price,
    ups: req.body.ups,
    taskConversation: req.body.taskConversation,
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

// TODO find by employer

router.get("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task === null) {
    console.log(TaskNotFoundError);
    return res.status(404).json(TaskNotFoundError);
  }

  res.json(await task.populate("employer"));
});

// TODO add api authorization
router.patch("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task === null) {
    console.log(TaskNotFoundError);
    return res.status(404).json(TaskNotFoundError);
  }

  task.employer = req.body.employer ? req.body.employer : task.employer;
  task.name = req.body.name ? req.body.name : task.name;
  task.details = req.body.details ? req.body.details : task.details;
  task.tags = req.body.tags ? req.body.tags : task.tags;
  task.location = req.body.location ? req.body.location : task.location;
  task.skill = req.body.skill ? req.body.skill : task.skill;
  task.date = req.body.date ? req.body.date : task.date;
  task.open = req.body.open ? req.body.open : task.open;
  task.currency = req.body.currency ? req.body.currency : task.currency;
  task.price = req.body.price ? req.body.price : task.price;
  task.ups = req.body.ups ? req.body.ups : task.ups;
  task.taskConversation = req.body.taskConversation
    ? req.body.taskConversation
    : task.taskConversation;

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

// TODO add api authorization
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
