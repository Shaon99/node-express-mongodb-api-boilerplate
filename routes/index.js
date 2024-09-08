const express = require("express");
const router = express.Router();
//validation rules
const { validateSignUp, validateSignIn } = require("../request/userRequest");
const { validateProduct } = require("../request/productRequest");

//controllers imports
const { index, store } = require("../controllers/productController");
const { signIn, signUp } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

//Routs
router.post("/product/store", authMiddleware, validateProduct, store);
router.get("/products", authMiddleware, index);

router.post("/sign-up", validateSignUp, signUp);
router.post("/sign-in", validateSignIn, signIn);

module.exports = router;
