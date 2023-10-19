const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    default: this.mrp,
  },
  discount: {
    type: Number,
    default: function () {
      return Math.round(((this.mrp - this.price) / this.mrp) * 100);
    },
  },
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Men", "Women"],
  },
  color: String,
  category: String,
  sizes: [],
});

module.exports = mongoose.model("Product", productSchema);
