const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  party: { type: Number, required: true },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  tableId: { type: mongoose.Schema.Types.ObjectId, ref: "Table" },

  reservationDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Delivered", "waiting", "Rejected", "All"],
    default: "waiting",
  },
  speciaResquests: { type: String },
  createdAt: { type: Date, default: Date.now },
});
const Guest = mongoose.model("guest", guestSchema);
module.exports = Guest;
