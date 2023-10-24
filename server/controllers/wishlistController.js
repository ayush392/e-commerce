const User = require("../models/userModel");
const Product = require("../models/productModel");

const getWishlist = async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.user._id })
      .select("wishlist")
      .populate("wishlist.product");
    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const addToWishlist = async (req, res) => {
  const { productId } = req.body;
  try {
    const result = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $push: { wishlist: { product: productId } } },
      { new: true }
    ).populate("wishlist.product");

    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const removeFromWishlist = async (req, res) => {
  const { productId } = req.body;
  try {
    const result = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $pull: { wishlist: { product: productId } } },
      { new: true }
    ).populate("wishlist.product");

    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const clearWishlist = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { wishlist: [] },
      { new: true }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
};
