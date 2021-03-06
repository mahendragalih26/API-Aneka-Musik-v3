const express = require("express");
// const Multer = require("../middleware/Multer");
const router = express.Router();

const main = require("../controllers/Checkout");

router.get("/", main.getAll);
router.post("/", main.insertCheckout);
// router.patch("/:id", main.updateProduct);
// router.delete("/:id", main.deleteWishlist);

module.exports = router;
