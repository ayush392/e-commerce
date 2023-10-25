const {
  getCartItems,
  addToCart,
  removeFromCart,
  clearCart,
  updateQuantity,
} = require("../controllers/cartController");
const requireAuth = require("../middleware/requireAuth");
const {
  signupUser,
  loginUser,
  recentlyViewedItems,
  addToRecentlyViewed,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = require("../controllers/wishlistController");

const router = require("express").Router();

/* 
*   user
        - POST signin
        - POST signup
        - GET view user profile
        - PATCH update user profile
*   recentlyViewed
        - GET get all items
        - POST insert one item
*   wishlist
        - GET all items of wishlist
        - POST add to wishlist
        - DELETE remove item from wishlist
        - DELETE Clear wishlist
*   cart
        - GET items of cart
        - POST add an item to cart
        - PUT update quantity of an item
        - DELETE remove an item from cart, clear cart
      (TODO:) 
        - POST checkout
*/

// User
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/profile", requireAuth, getUserProfile);
router.patch("/profile", requireAuth, updateUserProfile);

// cart
router.get("/cart", requireAuth, getCartItems);
router.post("/cart/add", requireAuth, addToCart);
router.put("/cart/update", requireAuth, updateQuantity);
router.delete("/cart/remove", requireAuth, removeFromCart);
router.delete("/cart/clear", requireAuth, clearCart);

// recently viewed
router.get("/recent", requireAuth, recentlyViewedItems);
router.post("/recent", requireAuth, addToRecentlyViewed);

// Wishlist
router.get("/wishlist", requireAuth, getWishlist);
router.post("/wishlist/add", requireAuth, addToWishlist);
router.delete("/wishlist/remove", requireAuth, removeFromWishlist);
router.delete("/wishlist/clear", requireAuth, clearWishlist);

module.exports = router;
