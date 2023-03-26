const express = require("express");
const router = express.Router();
const {
  getProducts,
  setProduct,
  searchProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getProducts).post(protect, setProduct);
router.route("/:id").delete(protect, deleteProduct).put(protect, updateProduct);
router.route('/search/').get(searchProducts)
module.exports = router;
