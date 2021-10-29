const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  members: {
    type: [{ type: Schema.Types.ObjectId, ref: "Account" }],
    required: true,
  },
  messages: {
    type: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  },
});
// TODO add name

module.exports = mongoose.model("Conversation", conversationSchema);
