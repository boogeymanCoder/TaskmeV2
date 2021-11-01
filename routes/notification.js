const express = require("express");
const router = express.Router();
const Notification = require("../models/notification");
const NotificationNotFoundError = require("./error").NotificationNotFoundError;

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

router.get("/:id", async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (notification === null) {
    console.log(NotificationNotFoundError);
    return res.status(404).send(NotificationNotFoundError);
  }

  res.json(await notification.populate("owner"));
});

router.patch("/:id", async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (notification === null) {
    console.log(NotificationNotFoundError);
    return res.status(404).send(NotificationNotFoundError);
  }

  notification.owner = req.body.owner ? req.body.owner : notification.owner;
  notification.conversations = req.body.conversations
    ? req.body.conversations
    : notification.conversations;
  notification.tasks = req.body.tasks ? req.body.tasks : notification.tasks;
  notification.posts = req.body.posts ? req.body.posts : notification.posts;
  notification.comments = req.body.comments
    ? req.body.comments
    : notification.comments;
  notification.applications = req.body.applications
    ? req.body.applications
    : notification.applications;
  notification.offers = req.body.offers ? req.body.offers : notification.offers;

  await notification
    .save()
    .then(async () => {
      console.log("Notification Update Successful");
      res.json(await notification.populate("owner"));
    })
    .catch((err) => {
      console.log("Notification Update Failed, Cause:", err);
      res.status(400).json(err);
    });
});

router.put("/:id/conversations", async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (notification === null) {
    console.log(NotificationNotFoundError);
    return res.status(404).send(NotificationNotFoundError);
  }

  const conversation = req.body.conversation;
  notification.conversations.push(conversation._id);

  await notification
    .save()
    .then(async () => {
      console.log("Conversation Put Successful");
      res.json(await notification.populate("owner"));
    })
    .catch((err) => {
      console.log("Conversation Put Successful");
      res.status(400).send(err);
    });
});

router.put("/:id/tasks", async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (notification === null) {
    console.log(NotificationNotFoundError);
    return res.status(404).send(NotificationNotFoundError);
  }

  const task = req.body.task;
  notification.tasks.push(task._id);

  await notification
    .save()
    .then(async () => {
      console.log("Task Put Successful");
      res.json(await notification.populate("owner"));
    })
    .catch((err) => {
      console.log("Task Put Successful");
      res.status(400).send(err);
    });
});

router.put("/:id/posts", async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (notification === null) {
    console.log(NotificationNotFoundError);
    return res.status(404).send(NotificationNotFoundError);
  }

  const post = req.body.post;
  notification.posts.push(post._id);

  await notification
    .save()
    .then(async () => {
      console.log("Post Put Successful");
      res.json(await notification.populate("owner"));
    })
    .catch((err) => {
      console.log("Post Put Successful");
      res.status(400).send(err);
    });
});

router.put("/:id/comments", async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (notification === null) {
    console.log(NotificationNotFoundError);
    return res.status(404).send(NotificationNotFoundError);
  }

  const comment = req.body.comment;
  notification.comments.push(comment._id);

  await notification
    .save()
    .then(async () => {
      console.log("Comment Put Successful");
      res.json(await notification.populate("owner"));
    })
    .catch((err) => {
      console.log("Comment Put Successful");
      res.status(400).send(err);
    });
});

router.put("/:id/applications", async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (notification === null) {
    console.log(NotificationNotFoundError);
    return res.status(404).send(NotificationNotFoundError);
  }

  const application = req.body.application;
  notification.applications.push(application._id);

  await notification
    .save()
    .then(async () => {
      console.log("Application Put Successful");
      res.json(await notification.populate("owner"));
    })
    .catch((err) => {
      console.log("Application Put Successful");
      res.status(400).send(err);
    });
});

router.put("/:id/offers", async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (notification === null) {
    console.log(NotificationNotFoundError);
    return res.status(404).send(NotificationNotFoundError);
  }

  const offer = req.body.offer;
  notification.offers.push(offer._id);

  await notification
    .save()
    .then(async () => {
      console.log("Offer Put Successful");
      res.json(await notification.populate("owner"));
    })
    .catch((err) => {
      console.log("Offer Put Successful");
      res.status(400).send(err);
    });
});

module.exports = router;
