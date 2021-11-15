const express = require("express");
const router = express.Router();
const Rate = require("../../models/rate");
const RateNotFoundError = require("./error").RateNotFoundError;

router.post("/", async (req, res) => {
  const rate = new Rate({
    rate: req.body.rate,
    review: req.body.review,
    from: req.body.from,
    to: req.body.to,
  });

  await rate
    .save()
    .then(async () => {
      console.log("Rate Created Successfully");
      res.json(await rate.populate(["from", "to"]));
    })
    .catch((err) => {
      console.log("Rate Creation Failed, Cause:", err);
      res.status(400).json(err);
    });
});

router.get("/:id", async (req, res) => {
  const rate = await Rate.findById(req.params.id);

  if (rate === null) {
    console.log(RateNotFoundError);
    return res.status(404).send(RateNotFoundError);
  }

  res.json(await rate.populate(["from", "to"]));
});

router.patch("/:id", async (req, res) => {
  const rate = await Rate.findById(req.params.id);

  if (rate === null) {
    console.log(RateNotFoundError);
    return res.status(404).send(RateNotFoundError);
  }

  rate.rate = req.body.rate ? req.body.rate : rate.rate;
  rate.review = req.body.review ? req.body.review : rate.review;
  rate.from = req.body.from ? req.body.from : rate.from;
  rate.to = req.body.to ? req.body.to : rate.to;

  await rate
    .save()
    .then(async () => {
      console.log("Rate Update Successful");
      res.json(await rate.populate(["from", "to"]));
    })
    .catch((err) => {
      console.log("Rate Update Failed, Cause:", err);
      res.status(400).json(err);
    });
});

router.delete("/:id", async (req, res) => {
  const rate = await Rate.findById(req.params.id);

  if (rate === null) {
    console.log(RateNotFoundError);
    return res.status(404).send(RateNotFoundError);
  }

  await Rate.findByIdAndDelete(req.params.id)
    .then(async () => {
      console.log("Rate Delete Successful");
      res.json(await rate.populate(["from", "to"]));
    })
    .catch((err) => {
      console.log("Rate Delete Failed, Cause:", err);
      res.status(400).json(err);
    });
});

module.exports = router;
