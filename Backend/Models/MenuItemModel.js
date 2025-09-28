const mongoose = require("mongoose");
const menuItemSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "client",
    required: true,
  },
  name: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["Dinker", "starter", "Appetizer", "Dessert", "Main"],
  },
  price: { type: Number, required: true },
  currency: {
    type: String,
    default: "RWF",
    enum: ["RWF", "USD", "EUR"],
  },
  ingredients: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  illustration: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const menuItem = mongoose.model("MenuItem", menuItemSchema);
module.exports = menuItem;
