const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  members: {
    type: [{ type: Schema.Types.ObjectId, ref: "Account" }],
    required: true,
  },
  seenBy: {
    type: [{ type: Schema.Types.ObjectId, ref: "Account" }],
  }, // TODO remove and transfer to notification
  messages: {
    type: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  },
});
// TODO add name

module.exports = mongoose.model("Conversation", conversationSchema);
