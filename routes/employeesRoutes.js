const express = require('express');
const {getEmployees, createEmployee,getEmployee,updateEmployee,deleteEmployee,postImage} = require('../controllers/employeeController');
const router = express.Router();
const upload = require('../config/multerConfig');


router.route("/").get(getEmployees).post(createEmployee);
router.route("/:id/avatar").post(upload,postImage);

router.route("/:id").get(getEmployee).put(updateEmployee).delete(deleteEmployee);



module.exports = router;