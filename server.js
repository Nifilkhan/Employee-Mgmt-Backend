const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');
const session = require('express-session');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const ejs = require('ejs');
const { route } = require('./routes/employeesRoutes');
const viewControllerRouts = require("./routes/viewControllerRoutes");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
// const multer = require('multer');
const employeeSchema = require('./model/employeeModel');

connectDb();
const app = express();

const port = process.env.PORT || 6000;

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.json());

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: false } // Adjust secure option based on your environment
}));

app.use('/css',express.static(path.resolve(__dirname,'assets/css')));
app.use('/javascript',express.static(path.resolve(__dirname,'assets/javascript')));
app.use('/icon',express.static(path.resolve(__dirname,'assets/icon')));
app.use('/uploads',express.static(path.resolve(__dirname,"config/uploads")));

app.use('/',viewControllerRouts);

app.use("/api/employes", require("./routes/employeesRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

app.use(errorHandler);
app.listen(port, () => {
    console.log(`listening on port: http://localhost:${port}`);
});