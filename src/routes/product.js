const express = require("express");
const Multer = require("../middleware/Multer");
const Auth = require("../middleware/Auth");
const router = express.Router();

const main = require("../controllers/Product");

router.get("/", main.getAll);
router.post("/", Multer.multerUploads, main.insertProduct);
router.patch("/:id", Auth.authLogin, main.updateProduct);
router.delete("/:id", Auth.authLogin, main.deleteProduct);

module.exports = router;
