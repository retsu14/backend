const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const register = asyncHandler(async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        res.status(400).json({ message: 'Please fill all fields' });
    }

    if (password !== confirmPassword) {
        res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
        }
        let newUser = new User({ name, email, password });

        await newUser.save()

        return res.status(201).json({
            message: 'User created successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });

    }
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Please fill all fields' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        else {
            generateToken(user._id, res);
            res.status(200).json({
                message: 'User logged in successfully',
                name: user.name,
                email: user.email,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
})

const generateToken = (id, res) => {
    const token = jwt.sign({ id }, process.env.JWT, {
        expiresIn: "1d",
    });
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
    });
};

module.exports = { register, login };