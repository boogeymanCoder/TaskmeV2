const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
const CommentNotFoundError = require("./error").CommentNotFoundError;

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
    .then(async () => {
      console.log("Comment Creation Successful");
      res.json(await comment.populate("owner"));
    })
    .catch((err) => {
      console.log("Comment Creation Failed, Cause: " + err);
      res.status(400).json(err);
    });
});

router.get("/:id", async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (comment === null) {
    console.log(CommentNotFoundError);
    res.status(404).send(CommentNotFoundError);
  }

  res.json(await comment.populate("owner"));
});

router.patch("/:id", async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (comment === null) {
    console.log(CommentNotFoundError);
    res.status(404).send(CommentNotFoundError);
  }

  comment.owner = req.body.owner ? req.body.owner : comment.owner;
  comment.replies = req.body.replies ? req.body.replies : comment.replies;
  comment.body = req.body.body ? req.body.body : comment.body;
  comment.date = req.body.date ? req.body.date : comment.date;
  comment.ups = req.body.ups ? req.body.ups : comment.ups;

  await comment
    .save()
    .then(async () => {
      console.log("Comment Updated Successfully");
      res.json(await comment.populate("owner"));
    })
    .catch((err) => {
      console.log("Comment Updated Failed, Cause:", err);
      res.status(400).json(err);
    });
});

router.delete("/:id", async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (comment === null) {
    console.log(CommentNotFoundError);
    res.status(404).send(CommentNotFoundError);
  }

  await Comment.findByIdAndDelete(req.params.id)
    .then(async () => {
      console.log("Comment Deletion Successful");
      res.json(await comment.populate("owner"));
    })
    .catch((err) => {
      console.log("Comment Deletion Failed, Cause:", err);
      res.status(400).json(err);
    });
});

module.exports = router;
