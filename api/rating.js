const express = require("express");
const router = express.Router();
const Rating = require("../models/rating");
const RatingNotFoundError = require("./error").RatingNotFoundError;

router.post("/", async (req, res) => {
  const rating = new Rating({
    owner: req.body.owner,
    average: req.body.average,
    ratings: req.body.ratings,
  });

  await rating
    .save()
    .then(async () => {
      console.log("Rating Created Successfully");
      res.json(await rating.populate("owner"));
    })
    .catch((err) => {
      console.log("Rating Creation Failed, Cause:", err);
      res.status(400).json(err);
    });
});

router.get("/owner/:owner", async (req, res) => {
  const rating = await Rating.findOne({ owner: req.params.owner });

  if (rating === null) {
    console.log(RatingNotFoundError);
    return res.status(400).send(RatingNotFoundError);
  }

  res.json(await rating.populate("owner"));
});

router.get("/id/:id", async (req, res) => {
  const rating = await Rating.findById(req.params.id);

  if (rating === null) {
    console.log(RatingNotFoundError);
    return res.status(400).send(RatingNotFoundError);
  }

  res.json(await rating.populate("owner"));
});

router.put("/:id/ratings/", async (req, res) => {
  const rating = await Rating.findById(req.params.id);

  if (rating === null) {
    console.log(RatingNotFoundError);
    return res.status(400).send(RatingNotFoundError);
  }

  const rate = req.body.rate;

  rating.ratings.push(rate);
  await rating
    .save()
    .then(async () => {
      console.log("Rate Put Successfully");
      res.json(await rating.populate("owner"));
    })
    .catch((err) => {
      console.log("Rate Put Failed, Cause:", err);
      res.status(400).json(err);
    });
});

router.patch("/:id", async (req, res) => {
  const rating = await Rating.findById(req.params.id);

  if (rating === null) {
    console.log(RatingNotFoundError);
    return res.status(400).send(RatingNotFoundError);
  }

  rating.owner = req.body.owner ? req.body.owner : rating.owner;
  rating.average = req.body.average ? req.body.average : rating.average;
  rating.ratings = req.body.ratings ? req.body.ratings : rating.ratings;

  await rating.save().then(async () => {
    console.log("Rating Updated Successfully");
    res.json(await rating.populate("owner"));
  });
});

router.delete("/:id", async (req, res) => {
  const rating = await Rating.findById(req.params.id);

  if (rating === null) {
    console.log(RatingNotFoundError);
    return res.status(400).send(RatingNotFoundError);
  }

  await Rating.findByIdAndDelete(req.params.id)
    .then(async () => {
      console.log("Rating Deleted Successfully");
      res.json(await rating.populate("owner"));
    })
    .catch((err) => {
      console.log("Rating Deletion Failed, Cause:", err);
      res.status(400).json(err);
    });
});

module.exports = router;
