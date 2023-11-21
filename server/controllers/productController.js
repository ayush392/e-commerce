const Product = require("../models/productModel");

const getAllProducts = async (req, res) => {
  const { gender, brands, category, price, colors, discount, sort } = req.query;
  // console.log(req.query);
  try {
    const productFilter = {};

    if (gender) {
      productFilter.gender = gender;
    }

    if (category) {
      const categoryArr = category.split(",");
      productFilter.category = { $in: categoryArr };
    }

    if (discount) {
      productFilter.discount = { $gte: discount };
    }

    if (brands) {
      const brandsArr = brands.split(",");
      console.log(brandsArr);
      productFilter.brand = { $in: brandsArr };
    }

    if (price) {
      const priceArr = price.split(",");
      productFilter.price = { $gte: priceArr[0], $lte: priceArr[1] };
    }

    if (colors) {
      const colorsArr = colors.split(",");
      productFilter.color = { $in: colorsArr };
    }

    let sortObj = {};
    if (sort) {
      if (sort === "price_asc") {
        sortObj.price = 1;
      } else if (sort === "price_desc") {
        sortObj.price = -1;
      } else if (sort === "discount") {
        sortObj.discount = -1;
      }
    }

    const result = await Product.find(productFilter).sort(sortObj).limit(25);
    // .select("imageUrl price brand title mrp discount");
    // const result = await Product.find({}).distinct("category");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getFilters = async (req, res) => {
  const { gender } = req.query;
  const filter = {};
  if (gender) {
    filter.gender = gender;
  }

  try {
    const categories = await Product.find(filter).distinct("category");
    const brands = await Product.find(filter).distinct("brand");
    const colors = await Product.find(filter).distinct("color");

    res.status(200).json({ categories, brands, colors });
  } catch (error) {
    res.status(500).json(error.message);
  }
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

module.exports = { getAllProducts, getSingleProduct, getFilters };
