const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
    unique: true,
  },
  conversations: {
    type: [{ type: Schema.Types.ObjectId, ref: "Conversation" }],
    required: true,
  },
  tasks: {
    type: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    required: true,
  },
  posts: {
    type: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    required: true,
  },
  comments: {
    type: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    required: true,
  },
  applications: {
    type: [{ type: Schema.Types.ObjectId, ref: "Application" }],
    required: true,
  },
  offers: {
    type: [{ type: Schema.Types.ObjectId, ref: "Offer" }],
    required: true,
  },
});

module.exports = mongoose.model("Notification", notificationSchema);
