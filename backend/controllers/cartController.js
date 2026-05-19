const Cart = require("../models/cart");
const Product = require("../models/Product");

//
// Add To Cart
//
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Check product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Check existing cart item
    const existingCartItem = await Cart.findOne({
      user: req.user._id,
      product: productId,
    });

    // If already exists → increase quantity
    if (existingCartItem) {
      existingCartItem.quantity += quantity || 1;

      await existingCartItem.save();

      return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        cart: existingCartItem,
      });
    }

    // Create cart item
    const cart = await Cart.create({
      user: req.user._id,
      product: productId,
      quantity: quantity || 1,
    });

    res.status(201).json({
      success: true,
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//
// Get My Cart
//
exports.getMyCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({
      user: req.user._id,
    }).populate("product");

    res.status(200).json({
      success: true,
      count: cartItems.length,
      cartItems,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//
// Update Cart Quantity
//
exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cartItem = await Cart.findById(req.params.id);

    // Check cart item
    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    // Make sure customer owns cart item
    if (
      cartItem.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    // Update quantity
    cartItem.quantity = quantity;

    await cartItem.save();

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//
// Remove Cart Item
//
exports.removeCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);

    // Check cart item
    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    // Make sure customer owns cart item
    if (
      cartItem.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await cartItem.deleteOne();

    res.status(200).json({
      success: true,
      message: "Cart item removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};