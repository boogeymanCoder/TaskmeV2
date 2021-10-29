const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  replies: {
    type: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    required: false,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  ups: {
    type: [{ type: Schema.Types.ObjectId, ref: "Account" }],
    required: false,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
