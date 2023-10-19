const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true, 
    },
    otp: Number,
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 30,
    },
});
otpSchema.methods.isExpired = function () {
  
    return Date.now() >= this.createdAt;
};
const otp = new mongoose.model("OTP", otpSchema);
module.exports = otp;