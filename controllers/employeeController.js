const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const Employee = require("../model/employeeModel");
//@desc get all employees
//@route GET /api/users
//@access public
// 
/**
 * @author
 * @param
 * @returns
 */
const getEmployees = asyncHandler(async (req, res) => {
  const employee = await Employee.find();
  const page = parseInt(req.query.page);
  const search = req.query.search || "";
  const limit = parseInt(req.query.limit);
  console.log(page);
  console.log("search", search);
  console.log(limit);

  const matchStage = {
    $match: {
      $or: [
        { firstName: new RegExp(search, "i") },
        { lastName: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ],
    },
  };

  const aggregationPipeline = [
    matchStage,
    {
      $sort: { createdAt:-1 }
    },
    {
      $facet: {
        metadata: [{ $count: "total" }],
        data: [{ $skip: (page - 1) * limit }, { $limit: limit }],
      },
    },
  ];
  const result = await Employee.aggregate(aggregationPipeline);
  const metadata = result[0].metadata;
  const data = result[0].data;
  const count = metadata.length > 0 ? metadata[0].total : 0;
  const totalPages = Math.ceil(count / limit);
  console.log(totalPages, "total");
  res.status(200).json({
    total: count,
    page,
    limit,
    totalPages,
    employees: data,
  });
});

const postImage = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const filename = req.file ? req.file.filename : null;
  console.log("Uploaded file:", req.file);
  const imagePath = `uploads/${filename}`;

  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded", imagePath });
  }

  try {
    // Find the employee by ID
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Update the employee's avatar field with the filename of the uploaded image
   employee.avatar = filename;
   const updatedEmployee = await employee.save();

    return res
      .status(200)
      .json({
        message: "Employee avatar updated successfully",
        employee: updatedEmployee,
      });
  } catch (error) {
    console.error("Error updating employee avatar:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
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
    if (
      !salutation ||
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !username ||
      !password ||
      !dob ||
      !gender ||
      !qualifications ||
      !address ||
      !country ||
      !state ||
      !city ||
      !pincode
    ) {
      res.status(400);
      throw new Error("All fields are required");
    }

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

    await employe.save();

    // const totalEmployees = await Employee.countDocuments();
    res.status(200).json({ employe });
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
  if (!employee) {
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
  if (!empolyee) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const updateEmployee = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updateEmployee);
});

//@desc delet employee
//@route DELETE /api/users/:id
//@access public
const deleteEmployee = asyncHandler(async (req, res) => {
  const empolyee = await Employee.findById(req.params.id);
  if (!empolyee) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const imagepath = empolyee.imagePath;
  await Employee.findByIdAndDelete(req.params.id);

  if (imagepath) {
    const fullpath = path.join(__dirname, "..", imagepath);
    fs.unlink(fullpath, (err) => {
      if (err) {
        console.log("error deleting image file:", err);
      }
    });
  }
  res.status(200).json(empolyee);
});

module.exports = {
  getEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  postImage,
};
