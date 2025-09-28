const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' },
  items: [{
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    quantity: Number,
    price: Number
  }],
  total: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['new', 'accepted', 'preparing', 'served', 'paid', 'rejected'],
    default: 'new'
  },
  paymentMethod: { type: String },
  paymentStatus: { type: String, enum: ['pending', 'completed'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);