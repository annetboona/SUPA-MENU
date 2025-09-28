const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  avatarUrl: String,
  role: {
    type: String,
    enum: ["admin", "owner", "staff"],
    default: "owner",
  },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});
const users = mongoose.model("Users", userSchema);
module.exports = users;
