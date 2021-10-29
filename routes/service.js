const express = require("express");
const router = express.Router();
const Service = require("../models/service");

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

module.exports = router;
