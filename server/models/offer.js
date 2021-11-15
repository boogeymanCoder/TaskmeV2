const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  task: {
    type: Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  accepted: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Offer", offerSchema);
