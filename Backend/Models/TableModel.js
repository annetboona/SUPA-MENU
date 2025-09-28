const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema({
  tableNumber: { type: Number, require: true, unique: true },
  capacity: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Available", "Occupied", "Reserved"],
    default: "Available",
  },
  location: { type: String, enum: ["Main", "Hall", "Bar"] },
  createdAt: { type: Date, default: Date.now },
});
const table = mongoose.model("Table", TableSchema);
module.exports = table;
