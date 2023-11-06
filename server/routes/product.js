const {
  getSingleProduct,
  getAllProducts,
} = require("../controllers/productController");
const Product = require("../models/productModel");

const router = require("express").Router();

/*
 *   GET all products
 *   GET a single product
 *   POST add a product
 *   DELETE delete a product
 *   PATCH update a product
 *   search a product
 *   filter products
 */

router.get("/", getAllProducts);
router.get("/:productId", getSingleProduct);

// router.get("/", async (req, res) => {
//   //   const products = await Product.find({ gender: "Men" });
//   //   const productss = await Product.find({ gender: "Women" });
//   const products = await Product.find({});
//   res.send(products);
//   //   const x = products.length;
//   //   const y = productss.length;
//   //   const z = productsss.length;
//   //   res.send({ x, y, z });
// });

// router.post("/", async (req, res) => {
//   const response = await Product.insertMany(req.body);
//   //   console.log(req.body, 17);
//   res.send(response);
// });

module.exports = router;
