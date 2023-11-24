const User = require("../models/userModel");
// const Product = require("../models/productModel");

const getCartItems = async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.user._id })
      .select("cart")
      .populate("cart.product");
    res.status(200).json(result.cart);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const addToCart = async (req, res) => {
  const { productId, quantity, size } = req.body;
  // console.log(req.body);
  if (!productId || !quantity || !size) {
    return res.status(404).json("Please provide all the required fields");
  }
  try {
    const result = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $push: { cart: { product: productId, quantity, size } } },
      { new: true }
    ).populate("cart.product");

    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const removeFromCart = async (req, res) => {
  const { _id } = req.body;
  // console.log(req.body);
  try {
    const result = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $pull: { cart: { product: _id } } },
      { new: true }
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateQuantity = async (req, res) => {
  const { _id, quantity, size } = req.body;
  // console.log(req.body);
  try {
    const result = await User.findOneAndUpdate(
      { _id: req.user._id, "cart.product": _id },
      { $set: { "cart.$.quantity": Number(quantity), "cart.$.size": size } },
      { new: true }
    ).select("cart");
    console.log(result);
    res.json(result.cart);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const clearCart = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { cart: [] },
      { new: true }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getCartItems,
  addToCart,
  removeFromCart,
  clearCart,
  updateQuantity,
};
