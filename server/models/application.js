const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  task: {
    type: Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  employee: {
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
  accepted: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Application", applicationSchema);
