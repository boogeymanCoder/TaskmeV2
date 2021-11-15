const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inboxSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
    unique: true,
  },
  conversations: {
    type: [{ type: Schema.Types.ObjectId, ref: "Conversation" }],
  },
});

module.exports = mongoose.model("Inbox", inboxSchema);
