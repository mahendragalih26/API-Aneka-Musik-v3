const express = require("express");
const product = require("../routes/product");
const branch = require("../routes/Branch");
const category = require("../routes/Category");

const router = express.Router();

router.use("/product", product);
router.use("/branch", branch);
router.use("/category", category);

module.exports = router;
