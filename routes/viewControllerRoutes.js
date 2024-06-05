const express = require('express');
const Router =express.Router();
const viewController = require("../controllers/viewController");
const validateToken= require('../middleware/validateTokenHandler');

Router.get('/',validateToken,viewController.renderIndex);

Router.get('/view',validateToken,viewController.renderViewDetails);
Router.get('/signup',viewController.renderLoginSignup);
Router.get('/verify-otp',viewController.renderRegisterOtp);
Router.get('/login',viewController.renderLoginSignup);
Router.get('/logout', (req, res) => {
    // Clear token from session
    req.session.token = null;
    res.redirect('/login'); // Redirect to login page after logout
});

module.exports = Router;