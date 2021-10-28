const express = require("express");
const router = express.Router();
const Conversation = require("../models/conversation");
const ConversationNotFoundError = require("./error").ConversationNotFoundError;

// TODO add api authentication
// TODO add api authorization
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

// TODO add api authentication
// TODO add api authorization
router.get("/:id", async (req, res) => {
  const conversation = await Conversation.findById(req.params.id);

  if (conversation === null) {
    console.log(ConversationNotFoundError);
    return res.status(404).send(ConversationNotFoundError);
  }

  res.json(conversation);
});

// TODO add api authentication
// TODO add api authorization
router.patch("/:id", async (req, res) => {
  const conversation = await Conversation.findById(req.params.id);

  if (conversation === null) {
    console.log(ConversationNotFoundError);
    return res.status(404).send(ConversationNotFoundError);
  }

  conversation.members = req.body.members
    ? req.body.members
    : conversation.members;
  conversation.seenBy = req.body.seenBy ? req.body.seenBy : conversation.seenBy;
  conversation.messages = req.body.messages
    ? req.body.messages
    : conversation.messages;

  conversation
    .save()
    .then(() => {
      console.log("Conversation Update Successful");
      res.json(conversation);
    })
    .catch((err) => {
      console.log("Conversation Update Failed, Cause:", err);
      res.status(400).json(err);
    });
});

// TODO add api authentication
// TODO add api authorization
router.delete("/:id", async (req, res) => {
  const conversation = await Conversation.findById(req.params.id);

  if (conversation === null) {
    console.log(ConversationNotFoundError);
    return res.status(404).send(ConversationNotFoundError);
  }

  await Conversation.findByIdAndDelete(req.params.id)
    .then(() => {
      console.log("Conversation Deletion Successful");
      res.json(conversation);
    })
    .catch((err) => {
      console.log("Conversation Deletion Failed, Cause:", err);
      res.status(400).json(err);
    });
});

module.exports = router;
