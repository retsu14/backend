const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { protect } = require("../../middlewares/auth-middleware");
const {
  createBlock,
  getBlock,
  deleteBlock,
  updateBlock,
} = require("../../controllers/block-controller");
const upload = require("../../middlewares/multer");

router.get("/", protect, getBlock);
router.post(
  "/create",
  protect,
  upload.single("image"),
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("component").not().isEmpty().withMessage("Component is required"),
    body("blueprint").not().isEmpty().withMessage("Blueprint is required"),
    body("site").not().isEmpty().withMessage("Site is required"),
  ],
  createBlock
);
router.delete("/delete/:id", protect, deleteBlock);
router.put(
  "/update/:id",
  protect,
  upload.single("image"),
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("component").not().isEmpty().withMessage("Component is required"),
    body("blueprint").not().isEmpty().withMessage("Blueprint is required"),
    body("site").not().isEmpty().withMessage("Site is required"),
  ],
  updateBlock
);

module.exports = router;
