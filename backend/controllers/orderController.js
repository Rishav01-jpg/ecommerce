const Order = require("../models/order");
const Cart = require("../models/cart");

//
// Create Order
//
exports.createOrder = async (req, res) => {
  try {
    const {
      shippingAddress,
      paymentMethod,
    } = req.body;
if (
  !shippingAddress ||
  !paymentMethod
) {
  return res.status(400).json({
    message:
      "Shipping address and payment method are required",
  });
}
    // Get customer cart
    const cartItems = await Cart.find({
      user: req.user._id,
    }).populate("product");

    // Check cart
    if (cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // Prepare order items
    const orderItems = cartItems.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    // Calculate total
    const totalAmount = cartItems.reduce(
      (acc, item) =>
        acc + item.product.price * item.quantity,
      0
    );

    // Create order
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalAmount,
      adminId:
  cartItems[0].product.createdBy,
    });

    // Clear cart after order
    await Cart.deleteMany({
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//
// Get My Orders
//
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).populate("orderItems.product");

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//
// Get Single Order
//
exports.getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(
      req.params.id
    )
      .populate("user", "name email")
      .populate("orderItems.product");

    // Check order
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Customer can only see own order
    if (
      req.user.role === "customer" &&
      order.user._id.toString() !==
        req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//
// Admin Get All Orders
//
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
  adminId: req.user._id,
})
      .populate("user", "name email")
      .populate("orderItems.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//
// Update Order Status
//
exports.updateOrderStatus = async (
  req,
  res
) => {
  try {
    const { orderStatus } = req.body;

    const order = await Order.findById(
      req.params.id
    );

    // Check order
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.orderStatus =
      orderStatus || order.orderStatus;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};