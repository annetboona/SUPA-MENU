const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  menuItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  size: {
    type: String,
    default: "12.5",
  },
  description: String,
  image: String,
});

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "client",
      required: true,
    },
    tableId:{type:mongoose.Schema.Types.ObjectId, ref:'Table'},
    
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "Frw",
    },
    status: {
      type: String,
      enum: ["New", "Delivered", "Rejected", "In Progress", "Ready"],
      default: "New",
    },
    orderType: {
      type: String,
      enum: ["delivery", "takeway", "dine_in"],
      required: true,
      default: "delivery",
    },
    paymentMethod: {
      type: String,
      enum: ["Mobile Money", "Cash", "Card"],
      default: "cash",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },
    orderSteps: {
      served: {
        type: Boolean,
        default: false,
      },
      callWaiter: {
        type: Boolean,
        default: false,
      },
      start: {
        type: Boolean,
        default: false,
      },
      review: {
        type: Boolean,
        default: false,
      },
      accept: {
        type: Boolean,
        default: false,
      },
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },
    review: {
      type: String,
      default: "",
    },
    tableNumber: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Generate order ID before saving
orderSchema.pre("save", async function (next) {
  if (!this.orderId) {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    this.orderId = `${timestamp}${random}`;
  }
  next();
});

// Calculate total amount before saving
orderSchema.pre("save", function (next) {
  if (this.items && this.items.length > 0) {
    this.totalAmount = this.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);
