const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({
                error: "Unauthorized: Missing Token",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT);

        if (!decoded) {
            return res.status(401).json({
                error: "Unauthorized: Invalid Token",
            });
        }
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Internal Server Error" });
    }
});

module.exports = { protect };