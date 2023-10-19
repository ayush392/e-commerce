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

    res.json({ newUser, token });
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

    res.json({ user, token });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const recentlyViewedItems = async (req, res) => {};

module.exports = { signupUser, loginUser, recentlyViewedItems };
