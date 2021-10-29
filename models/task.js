const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// TODO price
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
});
// TODO add ups
// TODO applications

module.exports = mongoose.model("Task", taskSchema);
