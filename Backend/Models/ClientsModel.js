const mongoose = require("mongoose");
const ClientSechema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    representative: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfCreation: {
      type: Date,
      required: true,
      default: Date.now,
    },
    address: {
      type: {
        province: String,
        district: String,
        sector: String,
        cell: String,
      },
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    bankAccount: {
      type: String,
      required: true,
    },
    sale: {
      type: Number,
      default: 0,
      },
    StartDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      isActive: {
        type: Boolean,
        default: true,
      },
    },
    totalRevenue: {
      type: Number,
      default: 0,
    },
    lastOrderDate: Date,
  },

  {
    timestamps: true,
  }
);
const Clients = mongoose.model("clients", ClientSechema);
module.exports = Clients;
