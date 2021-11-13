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

router.get("/owner/:owner", async (req, res) => {
  const posts = await Post.find({ owner: req.params.owner });

  if (posts.length <= 0) {
    console.log(PostNotFoundError);
    return res.status(400).send(PostNotFoundError);
  }

  res.json(posts);
});

router.get("/id/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post === null) {
    console.log(PostNotFoundError);
    return res.status(400).send(PostNotFoundError);
  }

  res.json(await post.populate("owner"));
});

router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post === null) {
    console.log(PostNotFoundError);
    return res.status(400).send(PostNotFoundError);
  }

  res.json(await post.populate("owner"));
});

router.put("/:id/comments/", async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post === null) {
    console.log(PostNotFoundError);
    return res.status(400).send(PostNotFoundError);
  }

  const comment = req.body.comment;

  post.comments.push(comment._id);

  post
    .save()
    .then(async () => {
      console.log("Comment Put Successfully");
      res.json(await post.populate("owner"));
    })
    .catch((err) => {
      console.log("Comment Put Failed, Cause:", err);
    });
});

router.patch("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post === null) {
    console.log(PostNotFoundError);
    return res.status(400).send(PostNotFoundError);
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
    return res.status(400).send(PostNotFoundError);
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
