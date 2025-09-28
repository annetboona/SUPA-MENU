const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  bankAccount: { type: String, required: true },
  tables: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Table' }],
  menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }]
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);