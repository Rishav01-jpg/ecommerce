const express = require("express");

const {
  getUsers,
  deleteUser,
  updateUser,
  getAdmins,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/userController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

//
// Admin gets users
//
router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  getUsers
);

//
// Admin deletes user
//
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteUser
);

//
// Admin updates user
//
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateUser
);
//
// Super Admin gets admins
//
router.get(
  "/admins",
  protect,
  authorizeRoles("super_admin"),
  getAdmins
);

//
// Super Admin updates admin
//
router.put(
  "/admin/:id",
  protect,
  authorizeRoles("super_admin"),
  updateAdmin
);

//
// Super Admin deletes admin
//
router.delete(
  "/admin/:id",
  protect,
  authorizeRoles("super_admin"),
  deleteAdmin
);

module.exports = router;