const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../model/userModel");
const nodemailer = require('nodemailer');
const generateOtp = require('../utils/generateOtp');
const validateMiddleware = require("../middleware/validateTokenHandler");
const cookie = require('cookie-parser');
require('dotenv').config();

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// In-memory storage for OTPs (replace with a database in production)
let tempUsers = {};
let usernames;
let emails;
let passwords;
const otp = generateOtp();

// @desc Register a user and send OTP
// @route POST /api/user/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    usernames= name,
    emails= email,
    passwords= password

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("Email already registered");
    }

    // Generate OTP
    tempUsers[email] = { name, email, password, otp };
    console.log(tempUsers[email]);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'OTP sent to your email', redirect: '/verify-otp', email });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send OTP' });
    }
});

// @desc Verify OTP and complete user registration
// @route POST /api/user/verify-otp
// @access public
const verifyOtp = asyncHandler(async (req, res) => {
    const { otps, email } = req.body;

    if (otp === otps) {
        // Save user to the database
        const hashedPassword = await bcrypt.hash(passwords, 10);
        const newUser = await User.create({
            name: usernames,
            email: emails,
            password: hashedPassword
        });
        console.log(newUser);
        newUser.save();
        // Clear OTP after successful verification
        delete tempUsers[email];
        res.status(200).json({ message: 'User registered successfully', redirect: '/login'});
    } else {
        res.status(400).json({ error: 'Invalid OTP' });
    }
});

// @desc Login user
// @route POST /api/user/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user = await User.findOne({ email });
    
    // Compare password with the hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        // Generate JWT token
        const token = jwt.sign({
            email: user.email,
            id: user._id,
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });
        // Set token as a cookie and send response
    req.session.token = token;
    res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401);
        throw new Error("Email or password is not valid");
    }
});


module.exports = { registerUser, verifyOtp, loginUser };
