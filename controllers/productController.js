const Product = require("../models/product");
const { storeProduct } = require("../services/productService.js");

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
// router.get("/:id", getProduct, (req, res) => {
//   res.json({ product: res.singleProduct });
// });

// //Updating one product
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

// //Deleting one product
// router.delete("/:id", getProduct, async (req, res) => {
//   try {
//     await res.singleProduct.remove(() => {
//       res.json({ message: "product deleted successfully" });
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });

/*all patch get one and deleted are use same type code so
this middleware take care all the process and get back with data*/
async function getProduct(req, res, next) {
  let singleProduct;
  try {
    singleProduct = await Product.findById(req.params.id);
    if (singleProduct == null) {
      return res.status(400).json({ message: "product not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.singleProduct = singleProduct;
  next();
}
module.exports = {
  index,
  store,
};
