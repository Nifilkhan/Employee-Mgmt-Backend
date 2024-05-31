const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const Employee = require('../model/employeeModel');
//@desc get all employees
//@route GET /api/users
//@access public
const getEmployees = asyncHandler(async (req, res) => {
    const employee = await Employee.find();
  res.status(200).json(employee);
});

//@desc create a new employee
//@route POST /api/users
//@access public
const createEmployee = asyncHandler(async (req, res) => {
  try {

  console.log("Create employee:", req.body);
  const {
    salutation,
    firstName,
    lastName,
    email,
    phone,
    username,
    password,
    dob,
    gender,
    qualifications,
    address,
    country,
    state,
    city,
    pincode,
  } = req.body;


  console.log(city);
  if(!salutation || !firstName || !lastName || !email || !phone || !username || !password || !dob || !gender || !qualifications || !address || !country || !state || !city || !pincode) {
    res.status(400);
    throw new Error("All fields are required");
  };

  const employe = await Employee.create({
    salutation,
    firstName,
    lastName,
    email,
    phone,
    username,
    password,
    dob,
    gender,
    qualifications,
    address,
    country,
    state,
    city,
    pincode,
  });
  res.status(200).json(employe);
} catch (err) {
  console.error("Error creating employee:", err);
    res.status(500).json({ message: "Internal Server Error" });
}
});


//@desc get employees
//@route GET /api/users/:id
//@access public
const getEmployee = asyncHandler(async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    if(!employee) {
        res.status(404);
        throw new Error("Contact not found");
    }
  res.status(200).json(employee);
});

//@desc put employee
//@route PUT /api/users/:id
//@access public
const updateEmployee = asyncHandler(async (req, res) => {
    const empolyee = await Employee.findById(req.params.id);
    if(!empolyee) {
        res.status(404);
        throw new Error("Contact not found");
    }
    const updateEmployee = await Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
  res.status(200).json(updateEmployee);
});

//@desc delet employee
//@route DELETE /api/users/:id
//@access public
const deleteEmployee = asyncHandler(async (req, res) => {
    const empolyee = await Employee.findById(req.params.id);
    if(!empolyee) {
        res.status(404);
        throw new Error("Contact not found");
    }
    await Employee.findByIdAndDelete(req.params.id);
  res.status(200).json(empolyee);
});

module.exports = {
  getEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
