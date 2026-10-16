const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');

// ====================================================
// GET ALL PRODUCTS
// ====================================================
// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    res.status(500).json({ message: 'Server Error: Unable to fetch products', error: error.message });
  }
};

// ====================================================
// GET SINGLE PRODUCT BY ID
// ====================================================
// @desc    Fetch single product details by ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product Not Found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// ====================================================
// CREATE NEW PRODUCT
// ====================================================
// @desc    Create a new product with Cloudinary image upload
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    let imageUrl = '';

    // Upload image to Cloudinary if file is provided by Multer
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'shopnest_products'
      });
      imageUrl = result.secure_url;
      
    }

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrl
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Failed to create product', error: error.message });
  }
};

// ====================================================
// UPDATE PRODUCT
// ====================================================
// @desc    Update product details and optional new image
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product Not Found' });
    }

    // Check and update provided fields, otherwise keep existing values
    product.name = name !== undefined ? name : product.name;
    product.description = description !== undefined ? description : product.description;
    product.price = price !== undefined ? price : product.price;
    product.category = category !== undefined ? category : product.category;
    product.stock = stock !== undefined ? stock : product.stock;

    // Handle new image upload if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'shopnest_products'
      });
      product.imageUrl = result.secure_url;

    }

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Failed to update product', error: error.message });
  }
};

// ====================================================
// DELETE PRODUCT
// ====================================================
// @desc    Delete a product by ID
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: 'Product Removed' });
    } else {
      res.status(404).json({ message: 'Product Not Found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Failed to delete product', error: error.message });
  }
};