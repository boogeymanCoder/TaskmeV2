const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  replyTo: {
    type: Schema.Types.ObjectId,
    ref: "Message",
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});
// TODO replyTo

module.exports = mongoose.model("Message", messageSchema);
