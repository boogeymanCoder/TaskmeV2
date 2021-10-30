const express = require("express");
const router = express.Router();
const Inbox = require("../models/inbox");
const InboxNotFoundError = require("./error").InboxNotFoundError;

// TODO add api authorization to all routes.
router.post("/", async (req, res) => {
  const inbox = new Inbox({
    owner: req.body.owner,
    conversations: req.body.conversations,
  });

  await inbox
    .save()
    .then(async () => {
      console.log("Inbox Creation Successful");
      res.json(await inbox.populate("owner"));
    })
    .catch((err) => {
      console.log("Inbox Creation Failed, Cause:", err);
      res.status(404).json(err);
    });
});

router.get("/:owner", async (req, res) => {
  const inbox = await Inbox.findOne({ owner: req.params.owner });

  if (inbox === null) {
    console.log(InboxNotFoundError);
    return res.status(404).send(InboxNotFoundError);
  }

  res.json(await inbox.populate("owner"));
});

// TODO add conversation route

router.patch("/:owner", async (req, res) => {
  const inbox = await Inbox.findOne({ owner: req.params.owner });

  if (inbox === null) {
    console.log(InboxNotFoundError);
    return res.status(404).send(InboxNotFoundError);
  }

  inbox.owner = req.body.owner ? req.body.owner : inbox.owner; // FIXME is this needed?
  inbox.conversations = req.body.conversations
    ? req.body.conversations
    : inbox.conversations;

  await inbox
    .save()
    .then(async () => {
      console.log("Inbox Update Successful");
      res.json(await inbox.populate("owner"));
    })
    .catch((err) => {
      console.log("Inbox Update Failed, Cause:", err);
      res.status(404).json(err);
    });
});

module.exports = router;
