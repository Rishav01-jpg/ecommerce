const Product = require("../models/Product");
const Order = require("../models/order");
const User = require("../models/User");

//
// Dashboard Stats
//
exports.getDashboardStats =
  async (req, res) => {
    try {

      // Total Products of logged-in admin
      const totalProducts =
        await Product.countDocuments({
          createdBy: req.user._id,
        });

      // Total Orders of logged-in admin
      const totalOrders =
        await Order.countDocuments({
          adminId: req.user._id,
        });

      // Orders of logged-in admin
      const orders =
        await Order.find({
          adminId: req.user._id,
        });

      // Total Revenue
      const totalRevenue =
        orders.reduce(
          (acc, item) =>
            acc + item.totalAmount,
          0
        );

      // Unique Customers
      const uniqueCustomers =
        new Set(
          orders.map((order) =>
            order.user.toString()
          )
        );

      const totalCustomers =
        uniqueCustomers.size;

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