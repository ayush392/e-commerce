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
  },

  password: {
    type: String,
    required: true,
  },

  address: {
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],

  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
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
