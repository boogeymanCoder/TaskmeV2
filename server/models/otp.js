const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otpSchema = new Schema({
  pin: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
    unique: true,
  },
  expiration: {
    type: Date,
  },
});

const verificationOtp = mongoose.model("VerificationOtp", otpSchema);
const recoveryOtp = mongoose.model("RecoveryOtp", otpSchema);

module.exports = {
  verificationOtp: verificationOtp,
  recoveryOtp: recoveryOtp,
};
