const Product = require("../models/productModel");

const getAllProducts = async (req, res) => {
  const { gender, brands, price, colors, discount, sort } = req.query;
  const productFilter = {};

  if (gender) {
    productFilter.gender = gender;
  }

  if (discount) {
    productFilter.discount = discount;
  }

  if (brands) {
    const brandsArr = brands.split(",");
    productFilter.brand = { $in: brandsArr };
  }

  if (price) {
    productFilter.price = price;
  }

  if (colors) {
    const colorsArr = colors.split(",");
    productFilter.color = { $in: colorsArr };
  }

  let sortObj = {};
  if (sort) {
    if (sort === "asc") {
      sortObj.price = 1;
    } else if (sort === "desc") {
      sortObj.price = -1;
    }
  }

  const result = await Product.find(productFilter).sort(sortObj);
  res.status(200).json(result);
};

const getSingleProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const result = await Product.findOne({ _id: productId });
    if (!result) {
      res.status(400).json("Product not found");
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { getAllProducts, getSingleProduct };
