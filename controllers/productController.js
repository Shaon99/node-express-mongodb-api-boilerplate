const Product = require("../models/product");
const {
  storeProduct,
  showProduct,
  deleteProductById,
  updateProduct,
} = require("../services/productService.js");

//Getting All product
const index = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Creating one product
const store = async (req, res) => {
  const productData = {
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    product_quantity: req.body.product_quantity,
    product_brand: req.body.product_brand,
    product_category: req.body.product_category,
    product_description: req.body.product_description,
  };
  try {
    const response = await storeProduct(productData);
    return res.status(201).json({ message: response.message });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Getting one product
const show = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await showProduct(productId);
    return res.status(201).json({ product: product });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Updating one product
// router.patch("/:id", getProduct, async (req, res) => {
//   if (req.body.product_name != null) {
//     res.singleProduct.product_name = req.body.product_name;
//   }
//   if (req.body.product_price != null) {
//     res.singleProduct.product_price = req.body.product_price;
//   }
//   if (req.body.product_quantity != null) {
//     res.singleProduct.product_quantity = req.body.product_quantity;
//   }
//   if (req.body.product_brand != null) {
//     res.singleProduct.product_brand = req.body.product_brand;
//   }
//   if (req.body.product_category != null) {
//     res.singleProduct.product_category = req.body.product_category;
//   }
//   if (req.body.product_description != null) {
//     res.singleProduct.product_description = req.body.product_description;
//   }
//   try {
//     const updateProduct = await res.singleProduct.save();
//     res.json({
//       message: "product updated successfully",
//       product: updateProduct,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });

//updateProduct

const update = async (req, res) => {
  const productId = req.params.id;
  const productData = {
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    product_quantity: req.body.product_quantity,
    product_brand: req.body.product_brand,
    product_category: req.body.product_category,
    product_description: req.body.product_description,
  };
  try {
    const response = await updateProduct(productId, productData);
    return res.status(201).json({ message: response.message });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// //Deleting one product
const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    await deleteProductById(productId);
    return res.status(200).json({ message: "Product successfully deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  index,
  store,
  show,
  deleteProduct,
  update,
};
