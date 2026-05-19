const express = require("express");

const {
  addToCart,
  getMyCart,
  updateCartItem,
  removeCartItem,
} = require("../controllers/cartController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

//
// Add To Cart
//
router.post(
  "/",
  protect,
  authorizeRoles("customer"),
  addToCart
);

//
// Get My Cart
//
router.get(
  "/",
  protect,
  authorizeRoles("customer"),
  getMyCart
);
//
// Update Cart Item
//
router.put(
  "/:id",
  protect,
  authorizeRoles("customer"),
  updateCartItem
);
//
// Remove Cart Item
//
router.delete(
  "/:id",
  protect,
  authorizeRoles("customer"),
  removeCartItem
);

module.exports = router;