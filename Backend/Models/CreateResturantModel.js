const mongoose = require("mongoose");
const ResturantSchema = new mongoose.Schema({
  resturantName: { type: String, required: true, trim: true },
  resturantCompleteName: { type: String, requierd: true, trim: true },
  contactNumber: { type: String, requierd: true },
  ownerNumber: { type: String, requierd: true },
  ownerName: { type: String, required: true },
  ownerEmail: { type: String, required: true },
  type: {
    type: String,
    enum: ["restaurant", "pub", "hotel", "coffeeshop", "other"],
    required: true,
  },
  cuisine: {
    type: String,
    enum: ["African", "Asian", "European", "American", "Indian", "Other"],
    requierd: true,
  },
  openingHours: {
    From: { type: String, requierd: true },
    To: { type: String, required: true },
  },
  images: [
    {
      url: String,
      public_id: String,
      type: {
        type: String,
        enum: ["logo", "banner", "gallery"],
        default: "gallery",
      },
    },
  ],
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
});
const Resturant = mongoose.model("resturant", ResturantSchema);
module.exports = Resturant;
