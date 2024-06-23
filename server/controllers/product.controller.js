import Ecommerce from '../models/ecommerce.models.js';

// Create a new product
const createProduct = async (req, res) => {
  try {
    const newProduct = new Ecommerce({
      name: req.body.name,
      description: req.body.description,
      quantity: req.body.quantity,
      price: req.body.price,
      category: req.body.category
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product saved successfully!', product: newProduct });
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await ecommerce.find({});
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await ecommerce.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    res.status(500).json({ error: err.message });
  }
};

// Update product by ID
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await ecommerce.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated', product: updatedProduct });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: err.message });
  }
};

// Delete product by ID
const deleteProductById = async (req, res) => {
  try {
    const deletedProduct = await ecommerce.findByIdAndRemove(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted', product: deletedProduct });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: err.message });
  }
};

// Delete all products
const deleteAllProducts = async (req, res) => {
  try {
    await ecommerce.deleteMany({});
    res.status(200).json({ message: 'All products deleted' });
  } catch (err) {
    console.error('Error deleting all products:', err);
    res.status(500).json({ error: err.message });
  }
};

// Find products by name containing keyword
const searchProductsByName = async (req, res) => {
  try {
    const keyword = req.query.name;
    const products = await ecommerce.find({ name: { $regex: keyword, $options: 'i' } });
    res.status(200).json(products);
  } catch (err) {
    console.error('Error searching products by name:', err);
    res.status(500).json({ error: err.message });
  }
};

export default {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProductById,
  deleteAllProducts,
  searchProductsByName
};
