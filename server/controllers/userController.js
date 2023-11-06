const Product = require("../models/productModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET);
};

const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json("Email already exists. Please login");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({ name, email, password: hash });
    const token = createToken(newUser._id);

    res.json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("Email doesn't exist. Please signup");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json("Incorrect password");
    }

    const token = createToken(user._id);

    res.json({ id: user._id, name: user.name, email: user.email, token });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUserProfile = async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.user._id });
    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateUserProfile = async (req, res) => {
  const { name, email, address } = req.body;
  const newProfile = {};
  if (name) {
    newProfile.name = name;
  }
  if (email) {
    newProfile.email = email;
  }
  if (address) {
    newProfile.address = address;
  }

  try {
    const result = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: newProfile },
      { new: true }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const recentlyViewedItems = async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.user._id })
      .select(recentlyViewed)
      .populate("recentlyViewed.product");
    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const addToRecentlyViewed = async (req, res) => {
  const { productId } = req.body;
  try {
    const result = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $push: { recentlyViewed: { product: productId } } },
      { new: true }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  signupUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  recentlyViewedItems,
  addToRecentlyViewed,
};
