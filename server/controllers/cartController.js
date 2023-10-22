const User = require("../models/userModel");
const Product = require("../models/productModel");

const getCartItems = async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.user._id })
      .select("cart")
      .populate("cart.product");
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  //   console.log(req.body);

  if (!productId || !quantity) {
    return res.status(404).json("please select product and quantity");
  }
  try {
    const result = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $push: { cart: { product: productId, quantity } } },
      { new: true }
    ).populate("cart.product");

    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  try {
    const result = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $pull: { cart: { product: productId } } },
      { new: true }
    ).populate("cart.product");

    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const result = await User.findOneAndUpdate(
      { _id: req.user._id, "cart.product": productId },
      { $set: { "cart.$.quantity": quantity } },
      { new: true }
    ).populate("cart.product");

    res.json(result);
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
