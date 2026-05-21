const Product = require("../models/Product");
const { redisClient } = require("../config/redis");

//
// Create Product
//
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category,
      brand,
    } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      brand,
      image: req.file.path,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//
// Get All Products
//
//
// Get All Products + Search + Filters
//
//
// Get All Products + Search + Filters + Pagination
//
exports.getProducts = async (req, res) => {
  try {
    const cacheKey = `products:${JSON.stringify(req.query)}`;
    const cachedProducts = await redisClient.get(cacheKey);

if (cachedProducts) {
  return res.status(200).json(JSON.parse(cachedProducts));
}
    const {
  keyword,
  category,
  minPrice,
  maxPrice,
  sort,
  page = 1,
  limit = 10,
} = req.query;

 let query = {};

    // Search
    if (keyword) {
      query.name = {
        $regex: keyword,
        $options: "i",
      };
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Price filter
    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Total products
    const totalProducts = await Product.countDocuments(query);

    // Get paginated products
    let sortOption = { createdAt: -1 };

// Sorting
if (sort === "price_asc") {
  sortOption = { price: 1 };
}

if (sort === "price_desc") {
  sortOption = { price: -1 };
}

if (sort === "newest") {
  sortOption = { createdAt: -1 };
}

if (sort === "oldest") {
  sortOption = { createdAt: 1 };
}

const products = await Product.find(query)
  .sort(sortOption)
  .skip(skip)
  .limit(Number(limit));

const responseData = {
  success: true,
  currentPage: Number(page),
  totalPages: Math.ceil(totalProducts / limit),
  totalProducts,
  count: products.length,
  products,
};

// Save to Redis for 10 minutes
await redisClient.setEx(
  cacheKey,
  600,
  JSON.stringify(responseData)
);
    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//
// Get Single Product
//
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // Check product
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//
// Get My Products
//
exports.getMyProducts = async (
  req,
  res
) => {
  try {
    const products =
      await Product.find({
        createdBy: req.user._id,
      }).sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//
// Update Product
//
exports.updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category,
      brand,
    } = req.body;

    const product = await Product.findById(req.params.id);

    // Check product
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Update fields
    product.name = name || product.name;
    product.description =
      description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.category =
      category || product.category;
    product.brand = brand || product.brand;

    // Update image if uploaded
    if (req.file) {
      product.image = req.file.path;
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//
// Delete Product
//
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // Check product
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};