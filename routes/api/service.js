const express = require("express");
const router = express.Router();
const Service = require("../../models/service");
const ServiceNotFoundError = require("./error").ServiceNotFoundError;

router.post("/", async (req, res) => {
  const service = new Service({
    owner: req.body.owner,
    name: req.body.name,
    details: req.body.details,
    currency: req.body.currency,
    price: req.body.price,
    tags: req.body.tags,
  });

  await service
    .save()
    .then(() => {
      console.log("Service Creation Successful");
      res.json(service);
    })
    .catch((err) => {
      console.log("Service Creation Failed, Cause:", err);
      res.status(400).json(err);
    });
});

// find by owner

router.get("/:id", async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (service == null) {
    console.log("Service Not Found");
    res.status(404).json(ServiceNotFoundError);
  }

  res.json(await service.populate(["owner"]));
});

router.patch("/:id", async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (service == null) {
    console.log("Service Not Found");
    res.status(404).json(ServiceNotFoundError);
  }

  service.owner = req.body.owner ? req.body.owner : service.owner;
  service.name = req.body.name ? req.body.name : service.name;
  service.details = req.body.details ? req.body.details : service.details;
  service.currency = req.body.currency ? req.body.currency : service.currency;
  service.price = req.body.price ? req.body.price : service.price;
  service.tags = req.body.tags ? req.body.tags : service.tags;

  await service
    .save()
    .then(() => {
      console.log("Service Creation Successful");
      res.json(service);
    })
    .catch((err) => {
      console.log("Service Creation Failed, Cause:", err);
      res.status(400).json(err);
    });
});

router.delete("/:id", async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (service == null) {
    console.log("Service Not Found");
    res.status(404).json(ServiceNotFoundError);
  }

  await Service.findByIdAndDelete(req.params.id)
    .then(() => {
      console.log("Service Deletion Successful");
      res.json(service);
    })
    .catch((err) => {
      console.log("Service Deletion Failed, Cause:", err);
      res.status(400).json(err);
    });
});

module.exports = router;
// FIXME return on 404
