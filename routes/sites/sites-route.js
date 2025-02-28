const expess = require("express");
const router = expess.Router();
const { body } = require("express-validator");
const {
  getSite,
  createSite,
  deleteSite,
  updateSite,
  getById,
} = require("../../controllers/sites-controller");
const { protect } = require("../../middlewares/auth-middleware");

router.get("/", protect, getSite);
router.get("/:id", protect, getById);
router.post(
  "/create",
  protect,
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("domain").not().isEmpty().withMessage("Domain is required"),
  ],
  createSite
);
router.delete("/delete/:id", protect, deleteSite);
router.put(
  "/update/:id",
  protect,
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("domain").not().isEmpty().withMessage("Domain is required"),
  ],
  updateSite
);

module.exports = router;
