const express = require("express");
const router = express.Router();
const Message = require("../models/message");

// TODO add api authentication
// TODO add api authorization
// TODO clear conversation seenBy
router.post("/", async (req, res) => {
  const message = new Message({
    sender: req.body.sender,
    message: req.body.message,
    date: req.body.date,
  });

  await message
    .save()
    .then(() => {
      console.log("Message Creation Successful");
      res.json(message);
    })
    .catch((err) => {
      console.log("Message Creation Failed, Cause:", err);
      res.status(400).json(err);
    });
});

module.exports = router;
