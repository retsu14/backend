const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");

const register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ message: errorMessages });
  }

  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    res.status(400).json({ message: "Please fill all fields" });
  }

  if (password !== confirmPassword) {
    res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    }

    const avatar = `https://avatar.iran.liara.run/public/boy?name=${name}`;
    let newUser = new User({ avatar, name, email, password });

    await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

const login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ message: errorMessages });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "Email is not yet registered." });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect Password. Please try again." });
    } else {
      generateToken(user._id, user.role, res);
      res.status(200).json({
        message: "User logged in successfully",
        avatar: user.avatar,
        name: user.name,
        email: user.email,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

const logout = asyncHandler(async (req, res) => {
  try {
    res.cookie("jwt", { maxAge: 0 });
    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error",
    });
  }
});

const generateToken = (id, role, res) => {
  const token = jwt.sign({ id, role }, process.env.JWT, {
    expiresIn: "1d",
  });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

module.exports = { register, login, logout };
