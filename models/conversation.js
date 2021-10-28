const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  members: {
    type: [{ type: Schema.Types.ObjectId, ref: "Account" }],
    required: true,
  },
  seenBy: {
    type: [{ type: Schema.Types.ObjectId, ref: "Account" }],
  },
  messages: {
    type: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  },
});

module.exports = mongoose.model("Conversation", conversationSchema);
