const express = require("express");

const router = express.Router();

const {
  getDashboardStats,
} = require("../controllers/adminController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

//
// Dashboard Stats
//
router.get(
  "/stats",
  protect,
  authorizeRoles("admin"),
  getDashboardStats
);

module.exports = router;