const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },

  password: {
    type: String,
    required: true,
  },

  address: {
    house: String,
    street: String,
    city: String,
    state: String,
    pincode: Number,
  },

  recentlyViewed: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      timestamp: { type: Date, default: Date.now },
    },
  ],

  wishlist: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      timestamp: { type: Date, default: Date.now },
    },
  ],

  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
      size: String,
    },
  ],
});

userSchema.pre("save", function (next) {
  // Ensure that the 'recentlyViewed' array is capped at 10 items
  if (this.recentlyViewed.length > 10) {
    this.recentlyViewed.shift(); // Remove the oldest item
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
