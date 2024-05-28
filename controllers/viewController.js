const path = require('path');

exports.renderIndex = (req,res) => {
    res.render('index');
}

exports.renderViewDetails = (req,res) => {
    res.render('view');
}

exports.renderLoginSignup = (req,res) => {
    res.render('loginSignup');
};

exports.renderRegisterOtp = (req,res) => {
    const email = req.query.email;
    res.render('registerOtp',{email});
};