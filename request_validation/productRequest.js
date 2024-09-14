// validators.js
const validator = require("validator");

const validateProduct = (req, res, next) => {
  const {
    product_name,
    product_price,
    product_quantity,
    product_brand,
    product_category,
    product_description,
  } = req.body;

  // Check if all required fields are present
  if (
    !product_name ||
    !product_price ||
    !product_quantity ||
    !product_brand ||
    !product_category ||
    !product_description
  ) {
    return res.status(400).json({ message: "All product fields are required" });
  }

  // If everything is valid, move to the next middleware or controller
  next();
};

module.exports = {
  validateProduct,
};
