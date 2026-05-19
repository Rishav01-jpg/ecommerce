const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../models/User");

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

const createSuperAdmin = async () => {
  try {
    // Check existing super admin
    const existingSuperAdmin = await User.findOne({
      role: "super_admin",
    });

    if (existingSuperAdmin) {
      console.log("Super Admin already exists");
      process.exit();
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("123456", 10);

    // Create super admin
    const superAdmin = await User.create({
      name: "Super Admin",
      email: "superadmin@gmail.com",
      password: hashedPassword,
      role: "super_admin",
    });

    console.log("Super Admin Created Successfully");
    console.log(superAdmin);

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

createSuperAdmin();