const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const PostNotFoundError = require("./error").PostNotFoundError;

router.post("/", async (req, res) => {
  const post = new Post({
    owner: req.body.owner,
    title: req.body.title,
    body: req.body.body,
    tags: req.body.tags,
    comments: req.body.comments,
    ups: req.body.ups,
  });

  post
    .save()
    .then(async () => {
      console.log("Post Creation Successful");
      res.json(await post.populate("owner"));
    })
    .catch((err) => {
      console.log("Post Creation Failed, Cause:", err);
      res.status(400).json(err);
    });
});

router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post === null) {
    console.log(PostNotFoundError);
    res.status(400).send(PostNotFoundError);
  }

  res.json(await post.populate("owner"));
});

router.patch("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post === null) {
    console.log(PostNotFoundError);
    res.status(400).send(PostNotFoundError);
  }

  post.owner = req.body.owner ? req.body.owner : post.owner;
  post.title = req.body.title ? req.body.title : post.title;
  post.body = req.body.body ? req.body.body : post.body;
  post.tags = req.body.tags ? req.body.tags : post.tags;
  post.comments = req.body.comments ? req.body.comments : post.comments;
  post.ups = req.body.ups ? req.body.ups : post.ups;

  post
    .save()
    .then(async () => {
      console.log("Post Update Successful");
      res.json(await post.populate("owner"));
    })
    .catch((err) => {
      console.log("Post Update Failed, Cause: ", err);
      res.status(400).json(err);
    });
});

router.delete("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post === null) {
    console.log(PostNotFoundError);
    res.status(400).send(PostNotFoundError);
  }

  await Post.findByIdAndDelete(req.params.id)
    .then(async () => {
      console.log("Post Deletion Successful");
      res.json(await post.populate("owner"));
    })
    .catch((err) => {
      console.log("Post Deletion Failed, Cause:", err);
      res.status(400).json(err);
    });
});

module.exports = router;
