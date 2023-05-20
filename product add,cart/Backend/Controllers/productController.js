const asyncHandler = require("express-async-handler");

const Product = require("../models/productlModel");
const User = require("../models/userModel");

// @desc    Get products
// @route   GET /api/products
// @access  Private
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user.id });

  res.status(200).json(products);
});

// @desc    Set product
// @route   POST /api/products
// @access  Private
const setProduct = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Please add a product");
  }

  const user = await User.findById(req.user.id);

  const product = await Product.create({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    catagories: req.body.catagories,
    price: req.body.price,
    user: req.user.id,
    username: user.name,
  });

  res.status(200).json(product);
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the product user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedProduct);
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the product user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

//@desc Search Products based on name or category
//@router GET /api/products/search/
//@access Public
const searchProducts = async (req, res) => {
  try {
    const searchQuery = req.body.query;
    
    // Search for products by name or category
    const products = await Product.find({
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        // { category: { $regex: searchQuery, $options: 'i' } }
        { catagories: { $elemMatch: { $regex: searchQuery, $options: 'i' } } }
      ]
    });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error' });
  }
};
module.exports = {
  getProducts,
  setProduct,
  searchProducts,
  updateProduct,
  deleteProduct,
};