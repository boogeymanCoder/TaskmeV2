const express = require("express");
const router = express.Router();
const Inbox = require("../models/inbox");

router.post("/", async (req, res) => {
  const inbox = new Inbox({
    owner: req.body.owner,
    conversations: req.body.conversations,
  });

  await inbox
    .save()
    .then(() => {
      console.log("Inbox Creation Successful");
      res.json(inbox);
    })
    .catch((err) => {
      console.log("Inbox Creation Failed, Cause:", err);
      res.status(404).json(err);
    });
});

module.exports = router;
