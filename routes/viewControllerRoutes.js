const express = require('express');
const Router =express.Router();
const viewController = require("../controllers/viewController");
const validateToken= require('../middleware/validateTokenHandler');

Router.get('/',validateToken,viewController.renderIndex);

Router.get('/view',viewController.renderViewDetails);
Router.get('/signup',viewController.renderLoginSignup);
Router.get('/verify-otp',viewController.renderRegisterOtp);
Router.get('/login',viewController.renderLoginSignup);


module.exports = Router;