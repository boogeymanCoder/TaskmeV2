const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

router.post("/", async (req, res) => {
  const comment = new Comment({
    owner: req.body.owner,
    replies: req.body.replies,
    body: req.body.body,
    date: req.body.date,
    ups: req.body.ups,
  });

  comment
    .save()
    .then(() => {
      console.log("Comment Creation Successful");
      res.json(comment);
    })
    .catch((err) => {
      console.log("Comment Creation Failed, Cause: " + err);
    });
});

// TODO CONTINUE

module.exports = router;
