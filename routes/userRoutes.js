const express = require('express');
const {registerUser,verifyOtp,loginUser,logout} = require('../controllers/userController');

const router = express.Router();

router.post("/signup",registerUser);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginUser);
// router.post('/logout', logout)

module.exports = router;
