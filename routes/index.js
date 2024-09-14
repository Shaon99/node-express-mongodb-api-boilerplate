const express = require("express");
const router = express.Router();
//validation rules
const {
  validateSignUp,
  validateSignIn,
} = require("../request_validation/userRequest");
const { validateProduct } = require("../request_validation/productRequest");

//controllers imports
const {
  index,
  store,
  show,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");
const { signIn, signUp } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

//Routs
router.patch("/product/:id", authMiddleware, validateProduct, updateProduct);
router.delete("/product/:id", authMiddleware, deleteProduct);
router.get("/product/:id", authMiddleware, show);
router.post("/product/store", authMiddleware, validateProduct, store);
router.get("/products", authMiddleware, index);

router.post("/sign-up", validateSignUp, signUp);
router.post("/sign-in", validateSignIn, signIn);

module.exports = router;
