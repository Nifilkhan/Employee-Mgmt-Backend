const express = require('express');
const {registerUser,verifyOtp,loginUser} = require('../controllers/userController');

const router = express.Router();

router.post("/signup",registerUser);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginUser);

module.exports = router;
