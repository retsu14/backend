const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { protect } = require("../../middlewares/auth-middleware");
const {
  getPage,
  createPage,
  deletePage,
  updatePage,
} = require("../../controllers/page-controller");

router.get("/", protect, getPage);
router.post(
  "/create",
  protect,
  [
    body("name").optional().not().isEmpty().withMessage("Name cannot be empty"),
    body("url").optional().not().isEmpty().withMessage("URL cannot be empty"),
    body("visibility")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Visibility must be a boolean"),
    body("sites").optional().isMongoId().withMessage("Invalid site ID"),
    body("block").optional().isMongoId().withMessage("Invalid block ID"),
  ],
  createPage
);
router.put(
  "/update/:id",
  protect,
  [
    body("name").optional().not().isEmpty().withMessage("Name cannot be empty"),
    body("url").optional().not().isEmpty().withMessage("URL cannot be empty"),
    body("visibility")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Visibility must be a boolean"),
    body("sites").optional().isMongoId().withMessage("Invalid site ID"),
    body("block").optional().isMongoId().withMessage("Invalid block ID"),
  ],
  updatePage
);
router.delete("/delete/:id", protect, deletePage);

module.exports = router;
