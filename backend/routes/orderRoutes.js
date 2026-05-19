const express = require("express");

const {
  createOrder,
  getMyOrders,
  getSingleOrder,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

//
// Create Order
//
router.post(
  "/",
  protect,
  authorizeRoles("customer"),
  createOrder
);

//
// Get My Orders
//
router.get(
  "/my-orders",
  protect,
  authorizeRoles("customer"),
  getMyOrders
);
//
// Get Single Order
//
router.get(
  "/:id",
  protect,
  getSingleOrder
);
//
// Admin Get All Orders
//
router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  getAllOrders
);
//
// Update Order Status
//
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateOrderStatus
);

module.exports = router;