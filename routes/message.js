const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const MessageNotFoundError = require("./error").MessageNotFoundError;

// TODO populate sender
// TODO add api authorization
router.post("/", async (req, res) => {
  const message = new Message({
    replyTo: req.body.replyTo,
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

router.get("/:id", async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (message === null) {
    console.log(MessageNotFoundError);
    return res.status(404).send(MessageNotFoundError);
  }

  res.json(message);
});

router.patch("/:id", async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (message === null) {
    console.log(MessageNotFoundError);
    return res.status(404).send(MessageNotFoundError);
  }

  message.replyTo = req.body.replyTo ? req.body.replyTo : req.body.replyTo;
  message.sender = req.body.sender ? req.body.sender : message.sender;
  message.message = req.body.message ? req.body.message : message.message;
  message.date = req.body.date ? req.body.date : message.date;

  await message
    .save()
    .then(() => {
      console.log("Message Update Successful");
      res.json(message);
    })
    .catch((err) => {
      console.log("Message Update Failed, Cause:", err);
      res.status(400).json(err);
    });
});

router.delete("/:id", async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (message === null) {
    console.log(MessageNotFoundError);
    return res.status(404).send(MessageNotFoundError);
  }

  await Message.findByIdAndDelete(req.params.id)
    .then(() => {
      console.log("Message Deletion Successful");
      res.json(message);
    })
    .catch((err) => {
      console.log("Message Deletion Failed, Cause:", err);
      res.status(400).json(err);
    });
});

module.exports = router;
