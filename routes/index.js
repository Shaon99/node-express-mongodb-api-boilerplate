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
  authorStore,
  getAuthor,
  authorShow,
  authorUpdate,
  authorDestroy,
} = require("../controllers/authorController");
const {
  index,
  store,
  show,
  deleteProduct,
  update,
} = require("../controllers/productController");
const { signIn, signUp } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

//Author-Route----------------START----------------
router.delete("/author/:id", authMiddleware, authorDestroy);
router.patch("/author/:id", authMiddleware, authorUpdate);
router.get("/author/:id", authMiddleware, authorShow);
router.post("/author/store", authMiddleware, authorStore);
router.get("/authors", authMiddleware, getAuthor);
//Author-Route----------------END----------------

//product-routes---------------START------------------------
router.patch("/product/:id", authMiddleware, validateProduct, update);
router.delete("/product/:id", authMiddleware, deleteProduct);
router.get("/product/:id", authMiddleware, show);
router.post("/product/store", authMiddleware, validateProduct, store);
router.get("/products", authMiddleware, index);
//product-routes---------------END------------------------

//AUTH-routes---------------START------------------------
router.post("/sign-up", validateSignUp, signUp);
router.post("/sign-in", validateSignIn, signIn);
//AUTH-routes---------------END------------------------
module.exports = router;
