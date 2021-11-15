const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
    unique: true,
  },
  average: {
    type: Number,
    required: true,
  },
  ratings: {
    type: [{ type: Schema.Types.ObjectId, ref: "Rate" }],
    required: true,
  },
});

module.exports = mongoose.model("Rating", ratingSchema);
