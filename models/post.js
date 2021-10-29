const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  comments: {
    type: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  ups: {
    type: [{ type: Schema.Types.ObjectId, ref: "Account" }],
    required: false,
  },
});

module.exports = mongoose.model("Post", postSchema);
