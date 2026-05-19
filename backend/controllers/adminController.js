const Product = require("../models/Product");
const Order = require("../models/order");
const User = require("../models/User");

//
// Dashboard Stats
//
exports.getDashboardStats =
  async (req, res) => {
    try {
      // Products
      const totalProducts =
        await Product.countDocuments();

      // Orders
      const totalOrders =
        await Order.countDocuments();

      // Customers
      const totalCustomers =
        await User.countDocuments({
          role: "customer",
        });

      // Revenue
      const orders =
        await Order.find();

      const totalRevenue =
        orders.reduce(
          (acc, item) =>
            acc + item.totalAmount,
          0
        );

      res.status(200).json({
        success: true,

        totalProducts,

        totalOrders,

        totalCustomers,

        totalRevenue,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };