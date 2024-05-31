const asyncHandler = require("express-async-handler");

const tokenValidate = asyncHandler(async (req, res, next) => {
    if(req.session.token) {
    console.log("Token set in session:", req.session.token);
    next();
    } else {
        // res.redirect('/login');
        res.status(401).json({message:"not authenticated"});

    }
})

module.exports = tokenValidate;
