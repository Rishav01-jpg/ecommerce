const express = require("express");

const {
  registerUser,
  loginUser,
  getMe,
  createAdmin,
  createManager,
  createStaff,
} = require("../controllers/authController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Protected Route
router.get("/me", protect, getMe);
router.get(
  "/admin-only",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
    });
  }
);
// Super Admin Creates Admin
router.post(
  "/create-admin",
  protect,
  authorizeRoles("super_admin"),
  createAdmin
);
// Admin Creates Manager
router.post(
  "/create-manager",
  protect,
  authorizeRoles("admin"),
  createManager
);

// Admin Creates Staff
router.post(
  "/create-staff",
  protect,
  authorizeRoles("admin"),
  createStaff
);
module.exports = router;