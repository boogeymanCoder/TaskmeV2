const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rateSchema = new Schema({
  rate: {
    type: Number,
    required: true,
  },
  from: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Rate", rateSchema);
