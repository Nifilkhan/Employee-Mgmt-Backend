const express = require('express');
const {getEmployees, createEmployee,getEmployee,updateEmployee,deleteEmployee} = require('../controllers/employeeController');
const router = express.Router();

router.route("/").get(getEmployees).post(createEmployee);

router.route("/:id").get(getEmployee).put(updateEmployee).delete(deleteEmployee);

// router.route("/").get(renderHome);


module.exports = router;