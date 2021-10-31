const express = require("express");
const router = express.Router();
const Notification = require("../models/notification");

router.post("/", async (req, res) => {
  const notification = new Notification({
    owner: req.body.owner,
    conversations: req.body.conversations,
    tasks: req.body.tasks,
    posts: req.body.posts,
    comments: req.body.comments,
    applications: req.body.applications,
    offers: req.body.offers,
  });

  await notification
    .save()
    .then(async () => {
      console.log("Notification Creation Successful");
      res.json(await notification.populate("owner"));
    })
    .catch((err) => {
      console.log("Notification Creation Failed, Cause:", err);
      res.status(400).json(err);
    });
});

module.exports = router;
