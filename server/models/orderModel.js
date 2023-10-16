const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    },
  ],
  orderDate: {
    type: Date,
    default: Date.now,
  },
  orderAmount: Number,
  shippingAddress: {
    house: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
  },
  orderStatus: {
    type: String,
    enum: ["Processing", "Shipped", "Delivered", "Cancelled", "Refunded"],
    default: "Processing",
  },
});

module.exports = mongoose.model("Order", orderSchema);
