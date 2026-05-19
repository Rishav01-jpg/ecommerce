const express = require("express");

const {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
} = require("../controllers/productController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

//
// Create Product
//
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  upload.single("image"),
  createProduct
);

//
// Admin My Products
//
router.get(
  "/my-products",
  protect,
  authorizeRoles("admin"),
  getMyProducts
);

//
// Update Product
//
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  upload.single("image"),
  updateProduct
);

//
// Delete Product
//
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteProduct
);
//
// Get All Products
//
router.get("/", getProducts);

//
// Get Single Product
//
router.get("/:id", getSingleProduct);
module.exports = router;