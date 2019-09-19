const express = require("express");

const product = require("../routes/product");
const branch = require("../routes/Branch");
const category = require("../routes/Category");
const wishlist = require("../routes/Wishlist");
const auth = require("../routes/Auth");
const cart = require("../routes/Cart");

const router = express.Router();

router.use("/product", product);
router.use("/branch", branch);
router.use("/category", category);
router.use("/wishlist", wishlist);
router.use("/auth", auth);
router.use("/cart", cart);

module.exports = router;
