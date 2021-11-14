const express = require("express");
const router = express.Router();
const Appointment = require("../../models/appointment");
const AppointmentNotFoundError = require("./error").AppointmentNotFoundError;

router.post("/", async (req, res) => {
  const appointment = new Appointment({
    owner: req.body.owner,
    public: req.body.public,
    schedules: req.body.schedules,
  });

  await appointment
    .save()
    .then(async () => {
      console.log("Appointment Creation Successful");
      res.json(await appointment.populate("owner"));
    })
    .catch((err) => {
      console.log("Appointment Creation Failed, Cause:", err);
      res.status(404).json(err);
    });
});

router.get("/id/:id", async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (appointment === null) {
    console.log(AppointmentNotFoundError);
    res.status(404).send(AppointmentNotFoundError);
  }

  res.json(await appointment.populate("owner"));
});

router.get("/owner/:owner", async (req, res) => {
  const appointment = await Appointment.findOne({ owner: req.params.owner });

  if (appointment === null) {
    console.log(AppointmentNotFoundError);
    res.status(404).send(AppointmentNotFoundError);
  }

  res.json(await appointment.populate("owner"));
});

router.put("/:id/schedules", async (req, res) => {
  // TODO check conflict
  const appointment = await Appointment.findById(req.params.id);

  if (appointment === null) {
    console.log(AppointmentNotFoundError);
    res.status(404).send(AppointmentNotFoundError);
  }

  const schedule = req.body.schedule;
  appointment.schedules.push(schedule);

  await appointment
    .save()
    .then(async () => {
      console.log("Schedule Put Successful");
      res.json(await appointment.populate("owner"));
    })
    .catch((err) => {
      console.log("Schedule Put Failed, Cause:", err);
      res.status(400).json(err);
    });
});

router.patch("/:id", async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (appointment === null) {
    console.log(AppointmentNotFoundError);
    res.status(404).send(AppointmentNotFoundError);
  }

  appointment.owner = req.body.owner ? req.body.owner : appointment.owner;
  appointment.public = req.body.public ? req.body.public : appointment.public;
  appointment.schedules = req.body.schedules
    ? req.body.schedules
    : appointment.schedules;

  await appointment
    .save()
    .then(async () => {
      console.log("Appointment Update Successful");
      res.json(await appointment.populate("owner"));
    })
    .catch((err) => {
      console.log("Appointment Update Failed, Cause:", err);
      res.status(400).json(err);
    });
});

router.delete("/:id", async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (appointment === null) {
    console.log(AppointmentNotFoundError);
    res.status(404).send(AppointmentNotFoundError);
  }

  await Appointment.findByIdAndDelete(req.params.id)
    .then(async () => {
      console.log("Appointment Delete Successful");
      res.json(await appointment.populate("owner"));
    })
    .catch((err) => {
      console.log("Appointment Delete Failed, Cause:", err);
      res.status(400).json(err);
    });
});

module.exports = router;
