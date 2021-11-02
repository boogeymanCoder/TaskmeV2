const express = require("express");
const router = express.Router();
const Rate = require("../models/rate");

router.post("/", async (req, res) => {
  const rate = new Rate({
    rate: req.body.rate,
    from: req.body.from,
    to: req.body.to,
  });

  await rate
    .save()
    .then(() => {
      console.log("Rate Created Successfully");
      res.json(rate);
    })
    .catch((err) => {
      console.log("Rate Creation Failed, Cause:", err);
      res.status(400).json(err);
    });
});

module.exports = router;
