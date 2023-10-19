const {
  getCartItems,
  addToCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");
const requireAuth = require("../middleware/requireAuth");
const { signupUser, loginUser } = require("../controllers/userController");

const router = require("express").Router();

/*
*   signin
*   signup
*   recentlyViewed
        - get all
        - insert one
*   wishlist
        - add to wishlist
        - remove from wishlist
        - move from wishlist to cart
*   cart
        - add an item to cart
        - remove an item from cart
        - clear cart
        - update quantity of an item
*/

//todo: test api
router.post("/signup", signupUser);

router.post("/login", loginUser);

// cart
// TODO: test api
router.get("/cart", requireAuth, getCartItems);
router.put("/cart/add", requireAuth, addToCart);
router.put("/cart/remove", requireAuth, removeFromCart);
router.delete("/cart/clear", requireAuth, clearCart);

// router.get('/recent', getRecentlyViewedItems)

module.exports = router;
