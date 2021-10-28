const express = require("express");
const router = express.Router();
const Conversation = require("../models/conversation");

router.post("/", async (req, res) => {
  const conversation = new Conversation({
    members: req.body.members,
    seenBy: req.body.seenBy,
    messages: req.body.messages,
  });

  conversation
    .save()
    .then(() => {
      console.log("Conversation Creation Successful");
      res.json(conversation);
    })
    .catch((err) => {
      console.log("Conversation Creation Failed, Cause:", err);
      res.status(400).json(err);
    });
});

module.exports = router;
