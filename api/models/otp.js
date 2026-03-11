import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email:          { type: String, required: true, unique: true },
  otp:            { type: String, required: true },
  name:           { type: String, required: true },
  hashedPassword: { type: String, required: true },
  expiresAt:      { type: Date,   required: true },
});

export default mongoose.models.Otp || mongoose.model("Otp", otpSchema);