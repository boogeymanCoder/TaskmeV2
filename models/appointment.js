const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
    unique: true,
  },
  public: {
    type: Boolean,
    required: true,
  },
  schedules: {
    type: [{ type: Schema.Types.ObjectId, ref: "Schedule" }],
    required: true,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
