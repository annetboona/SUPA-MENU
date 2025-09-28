const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  ingredients: [String],
  image: { type: String },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);