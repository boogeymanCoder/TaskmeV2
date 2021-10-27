const express = require("express");
const router = express.Router();
const Application = require("../models/application");
const ApplicationNotFoundError = require("./error").ApplicationNotFoundError;

// TODO add api authentication
router.post("/", async (req, res) => {
  const application = new Application({
    task: req.body.task,
    employee: req.body.employee,
    message: req.body.message,
    date: req.body.date,
    accepted: req.body.accepted,
  });

  await application
    .save()
    .then(async () => {
      console.log("Application Creation Successful");

      res.json(await application.populate(["task", "employee"]));
    })
    .catch((err) => {
      console.log("Application Creation Failed, Cause:", err);
      res.status(400).json(err);
    });
});

// TODO add api authentication
router.get("/:id", async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (application === null) {
    console.log(ApplicationNotFoundError);
    return res.status(404).send(ApplicationNotFoundError);
  }

  res.json(await application.populate(["task", "employee"]));
});

// TODO add api authentication
// TODO add api authorization
router.patch("/:id", async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (application === null) {
    console.log(ApplicationNotFoundError);
    return res.status(404).send(ApplicationNotFoundError);
  }

  application.task = req.body.task ? req.body.task : application.task;
  application.employee = req.body.employee
    ? req.body.task
    : application.employee;
  application.message = req.body.message
    ? req.body.message
    : application.message;
  application.date = req.body.date ? req.body.date : application.date;
  application.accepted = req.body.accepted
    ? req.body.accepted
    : application.accepted;

  await application
    .save()
    .then(async () => {
      console.log("Application Update Successful");
      res.json(await application.populate(["task", "employee"]));
    })
    .catch((err) => {
      console.log("Application Update Failed, Cause:", err);
      res.status(400).json(err);
    });
});

// TODO add api authentication
// TODO add api authorization
router.delete("/:id", async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (application === null) {
    console.log(ApplicationNotFoundError);
    return res.status(404).send(ApplicationNotFoundError);
  }

  await Application.findByIdAndDelete(req.params.id)
    .then(async () => {
      console.log("Application Deletion Successful");
      res.json(await application.populate(["task", "employee"]));
    })
    .catch((err) => {
      console.log("Application Deletion Failed, Cause:", err);
      res.status(400).json(err);
    });
});

// TODO CONTINUE

module.exports = router;
