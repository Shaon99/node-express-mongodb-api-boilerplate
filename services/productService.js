const Product = require("../models/product");

// Function to store a product in the database
const storeProduct = async (productData) => {
  const product = new Product(productData);
  try {
    await product.save();
    return { success: true, message: "Product inserted successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};

const showProduct = async (productId) => {
  const product = await getProductById(productId);
  return product;
};

const deleteProductById = async (productId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  await Product.findByIdAndDelete(product._id);
  return product;
};

const getProductById = async (productId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  storeProduct,
  showProduct,
  deleteProductById,
};
