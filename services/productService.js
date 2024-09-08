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


module.exports ={
    storeProduct
}