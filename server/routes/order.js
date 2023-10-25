const router = require("express").Router();
const requireAuth = require("../middleware/requireAuth");
const {
  getAllOrders,
  getSingleOrder,
  createOrder,
  cancelOrder,
  deleteOrder,
} = require("../controllers/orderController");

/*
Order History: GET /api/orders
Order Details: GET /api/orders/:orderId
Order Creation: POST /api/orders
Order Cancellation: PUT /api/orders/:orderId/cancel
Order Payment: POST /api/orders/:orderId/payment

*/

router.get("/", requireAuth, getAllOrders);

router.get("/:orderId", requireAuth, getSingleOrder);

router.post("/", requireAuth, createOrder);

router.patch("/:orderId/cancel/:productId", requireAuth, cancelOrder);

router.delete("/:orderId", requireAuth, deleteOrder);

module.exports = router;
