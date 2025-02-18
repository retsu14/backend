const express = require("express")
const router = express.Router()
const { body } = require("express-validator");
const { register, login, logout } = require("../../controllers/authController")

router.post("/register", [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
], register)

router.post("/login", [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
], login)

router.post("/logout", logout)


module.exports = router