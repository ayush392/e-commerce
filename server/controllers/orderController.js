const Order = require("../models/orderModel");

const getAllOrders = async (req, res) => {
  try {
    const result = await Order.find({ user: req.user._id })
      .populate("products.product", "imageUrl title brand")
      .select("products orderDate");
    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getSingleOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const result = await Order.findOne({ _id: orderId }).populate(
      "products.product",
      "imageUrl title brand"
    );
    if (!result) {
      res.status(400).json("No such order found");
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const createOrder = async (req, res) => {
  const { orderData, address } = req.body;
  let amount = 0;
  for (let i = 0; i < orderData.length; i++) {
    let price = parseInt(orderData[i].quantity) * parseInt(orderData[i].price);
    amount += price;
    orderData[i].price = price;
  }
  try {
    const result = await Order.create({
      user: req.user._id,
      products: orderData,
      orderAmount: parseInt(amount),
      shippingAddress: address,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const cancelOrder = async (req, res) => {
  const { orderId, productId } = req.params;
  try {
    const result = await Order.findOneAndUpdate(
      { _id: orderId, "products.product": productId },
      { $set: { "products.$.orderStatus": "Cancelled" } },
      { new: true }
    );
    if (!result) {
      res.status(400).json("invalid orderId or productId");
    }
    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const result = await Order.findOneAndDelete({
      _id: orderId,
      user: req.user._id,
    });
    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  createOrder,
  cancelOrder,
  deleteOrder,
};
