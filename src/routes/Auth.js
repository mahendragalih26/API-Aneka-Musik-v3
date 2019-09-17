const express = require("express");
// const Multer = require("../middleware/Multer");
const router = express.Router();

const main = require("../controllers/Auth");
const Auth = require('../middleware/Auth')

// router.get("/", main.getAll);
router.post("/register", main.register);
router.post("/login", main.login);
// router.patch("/:id", main.updateProduct);
// router.delete("/:id", main.deleteWishlist);

module.exports = router;
