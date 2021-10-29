const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  employer: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  skill: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  open: {
    type: Boolean,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ups: {
    type: [{ type: Schema.Types.ObjectId, ref: "Account" }],
  },
  taskConversation: {
    type: Schema.Types.ObjectId,
    ref: "Conversation",
  },
});
// TODO details
// TODO tags

module.exports = mongoose.model("Task", taskSchema);
