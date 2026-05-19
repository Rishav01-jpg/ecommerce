const User = require("../models/User");

//
// Get Managers and Staff
//
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: { $in: ["manager", "staff"] },
    }).select("-password -__v");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//
// Delete Manager or Staff
//
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    // Check user
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Only manager/staff deletable
    if (
      user.role !== "manager" &&
      user.role !== "staff"
    ) {
      return res.status(403).json({
        message: "Cannot delete this user",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//
// Edit Manager or Staff
//
exports.updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.params.id);

    // Check user
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Only manager/staff editable
    if (
      user.role !== "manager" &&
      user.role !== "staff"
    ) {
      return res.status(403).json({
        message: "Cannot edit this user",
      });
    }

    // Update user
    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//
// Get All Admins
//
exports.getAdmins = async (req, res) => {
  try {
    const admins = await User.find({
      role: "admin",
    }).select("-password -__v");

    res.status(200).json({
      success: true,
      count: admins.length,
      admins,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//
// Update Admin
//
exports.updateAdmin = async (req, res) => {
  try {
    const { name, email } = req.body;

    const admin = await User.findById(req.params.id);

    // Check admin
    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    // Only admin editable
    if (admin.role !== "admin") {
      return res.status(403).json({
        message: "Cannot edit this user",
      });
    }

    // Update admin
    admin.name = name || admin.name;
    admin.email = email || admin.email;

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      admin,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//
// Delete Admin
//
exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await User.findById(req.params.id);

    // Check admin
    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    // Only admin deletable
    if (admin.role !== "admin") {
      return res.status(403).json({
        message: "Cannot delete this user",
      });
    }

    await admin.deleteOne();

    res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};