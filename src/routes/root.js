const express = require("express");

const product = require("../routes/product");
const branch = require("../routes/Branch");
const category = require("../routes/Category");
const wishlist = require("../routes/Wishlist");
const auth = require("../routes/Auth");
const cart = require("../routes/Cart");
const checkout = require("../routes/Checkout");

const router = express.Router();

router.use("/product", product);
router.use("/branch", branch);
router.use("/category", category);
router.use("/wishlist", wishlist);
router.use("/auth", auth);
router.use("/cart", cart);
router.use("/checkout", checkout);

module.exports = router;
