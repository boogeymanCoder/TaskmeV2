const express = require("express");
const router = express.Router();
const Offer = require("../models/offer");
const DuplicateOfferError = require("./error").DuplicateOfferError;

router.post("/", async (req, res) => {
  // check for duplicate offers
  const duplicate = await Offer.findOne({
    employer: req.body.employer,
    task: req.body.task,
    service: req.body.service,
  });
  if (duplicate !== null) {
    console.log(DuplicateOfferError);
    return res.status(400).send(DuplicateOfferError);
  }

  const offer = new Offer({
    employer: req.body.employer,
    task: req.body.task,
    service: req.body.service,
    accepted: req.body.accepted,
  });

  offer
    .save()
    .then(() => {
      console.log("Offer Creation Successful");
      res.json(offer);
    })
    .catch((err) => {
      console.log("Offer Creation Failed, Cause:", err);
      res.status(400).json(err);
    });
});

module.exports = router;
