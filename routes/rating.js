const express = require("express");
const router = express.Router();
const Rating = require("../models/rating");

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

module.exports = router;
