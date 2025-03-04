const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  createBlueprint,
  getBlueprint,
  deleteBlueprint,
  updateBlueprint,
} = require("../../controllers/blueprint-controller");
const { protect } = require("../../middlewares/auth-middleware");

router.get("/", protect, getBlueprint);
router.post(
  "/create",
  protect,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("data").not().isEmpty().withMessage("Data is required"),
  ],
  createBlueprint
);
router.delete("/delete/:id", protect, deleteBlueprint);
router.put(
  "/update/:id",
  protect,
  [
    body("title").optional().not().isEmpty().withMessage("Title is required"),
    body("data").optional().not().isEmpty().withMessage("Data is required"),
  ],
  updateBlueprint
);

module.exports = router;
