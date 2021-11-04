const express = require("express");
const router = express.Router();
const Offer = require("../../models/offer");
const DuplicateOfferError = require("./error").DuplicateOfferError;
const OfferNotFoundError = require("./error").OfferNotFoundError;

router.post("/", async (req, res) => {
  // check for duplicate offers
  const duplicate = await Offer.findOne({
    sender: req.body.sender,
    task: req.body.task,
    service: req.body.service,
  });
  if (duplicate !== null) {
    console.log(DuplicateOfferError);
    return res.status(400).send(DuplicateOfferError);
  }

  const offer = new Offer({
    sender: req.body.sender,
    task: req.body.task,
    service: req.body.service,
    accepted: req.body.accepted,
  });

  offer
    .save()
    .then(async () => {
      console.log("Offer Creation Successful");
      res.json(await offer.populate(["sender", "task", "service"]));
    })
    .catch((err) => {
      console.log("Offer Creation Failed, Cause:", err);
      res.status(400).json(err);
    });
});

router.get("/:id", async (req, res) => {
  const offer = await Offer.findById(req.params.id);

  if (offer === null) {
    console.log(OfferNotFoundError);
    return res.status(404).send(OfferNotFoundError);
  }

  res.json(await offer.populate(["sender", "task", "service"]));
});

router.patch("/:id", async (req, res) => {
  const offer = await Offer.findById(req.params.id);

  if (offer === null) {
    console.log(OfferNotFoundError);
    return res.status(404).send(OfferNotFoundError);
  }

  offer.sender = req.body.sender ? req.body.sender : offer.sender;
  offer.task = req.body.task ? req.body.task : offer.task;
  offer.service = req.body.service ? req.body.service : offer.service;
  offer.accepted = req.body.accepted ? req.body.accepted : offer.accepted;

  await offer
    .save()
    .then(async () => {
      console.log("Offer Update Successful");
      res.json(await offer.populate(["sender", "task", "service"]));
    })
    .catch((err) => {
      console.log("Offer Update Failed, Cause:", err);
      res.status(400).json(err);
    });
});

router.delete("/:id", async (req, res) => {
  const offer = await Offer.findById(req.params.id);

  if (offer === null) {
    console.log(OfferNotFoundError);
    return res.status(404).send(OfferNotFoundError);
  }

  await Offer.findByIdAndDelete(req.params.id)
    .then(async () => {
      console.log("Offer Delete Successful");
      res.json(await offer.populate(["sender", "task", "service"]));
    })
    .catch((err) => {
      console.log("Offer Deletion Failed, Cause:", err);
      res.status(400).json(err);
    });
});

module.exports = router;
