const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    salutation: {
      type: String,
      required: [true, "Salutation required"],
    },
    firstName: {
      type: String,
      required: [true, "Firstname required"],
    },
    lastName: {
      type: String,
      required: [true, "Lastname required"],
    },
    email: {
      type: String,
      required: [true, "Email required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number required"],
    },
    username: {
      type: String,
      required: [true, "Username required"],
    },
    password: {
      type: String,
      required: [true, "Password required"],
    },
    dob: {
      type: String,
      required: [true, "Date of birth required"],
    },
    gender: {
      type: String,
      required: [true, "Gender required"],
    },
    qualifications: {
      type: String,
      required: [true, "Qualification required"],
    },
    address: {
      type: String,
      required: [true, "Address required"],
    },
    country: {
      type: String,
      required: [true, "Country required"],
    },
    state: {
      type: String,
      required: [true, "State required"],
    },
    city: {
      type: String,
      required: [true, "City required"],
    },
    pincode: {
      type: String,
      required: [true, "Pincode required"],
    },
    // image: {
    //   data: Buffer,
    //   contentType: String,
    // }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employees", employeeSchema);
