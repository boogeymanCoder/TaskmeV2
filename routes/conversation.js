const express = require("express");
const router = express.Router();
const Conversation = require("../models/conversation");
const ConversationNotFoundError = require("./error").ConversationNotFoundError;

// TODO add api authorization all routes
router.post("/", async (req, res) => {
  const conversation = new Conversation({
    name: req.body.name,
    members: req.body.members,
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

router.get("/:id", async (req, res) => {
  const conversation = await Conversation.findById(req.params.id);

  if (conversation === null) {
    console.log(ConversationNotFoundError);
    return res.status(404).send(ConversationNotFoundError);
  }

  res.json(conversation);
});

router.put("/:id/messages", async (req, res) => {
  const conversation = await Conversation.findById(req.params.id);

  if (conversation === null) {
    console.log(ConversationNotFoundError);
    return res.status(404).send(ConversationNotFoundError);
  }

  const message = req.body.message;
  conversation.messages.push(message);

  await conversation
    .save()
    .then(() => {
      console.log("Message Putt Successful");
      res.json(conversation);
    })
    .catch((err) => {
      console.log("Message Putt Failed, Cause:", err);
      res.status(400).send(err);
    });
});

router.patch("/:id", async (req, res) => {
  const conversation = await Conversation.findById(req.params.id);

  if (conversation === null) {
    console.log(ConversationNotFoundError);
    return res.status(404).send(ConversationNotFoundError);
  }

  conversation.name = req.body.name ? req.body.name : conversation.name;
  conversation.members = req.body.members
    ? req.body.members
    : conversation.members;
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
