import Vendor from "../models/vendorModel.js";
import validator from "validator";

export const signup = async (req, res) => {
  const {
    fullName,
    email,
    password,
    whatsappNumber,
    address,
    city,
    skills,
    cnic,
    type,
  } = req.body;
  console.log(req.body);

  try {
    if (!fullName || !email || !password || !whatsappNumber || !address || !city || !skills || !cnic || !type) {
      throw new Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
      throw new Error("Please enter a valid email address");
    }
    if (password.length <= 6) {
      throw new Error("Please enter a strong password");
    }

    const exist = await Vendor.findOne({ email });
    if (exist) {
      throw new Error("Email is already in use");
    }

    const vendor = await Vendor.create({
      fullName,
      email,
      password,
      whatsappNumber,
      address,
      city,
      skills,
      cnic,
      type,
    });

    const vendorData = {
      _id: vendor._id,
      fullName: vendor.fullName,
      email: vendor.email,
      whatsappNumber: vendor.whatsappNumber,
      address: vendor.address,
      city: vendor.city,
      skills: vendor.skills,
      cnic: vendor.cnic,
      type: vendor.type,
      createdAt: vendor.createdAt,
    };

    res.status(201).json({ message: "Vendor created successfully", user: vendorData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
      throw new Error("Please enter a valid email address");
    }
    if (password.length <= 6) {
      throw new Error("Please enter a strong password");
    }

    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await vendor.comparePassword(password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const vendorData = {
      _id: vendor._id,
      fullName: vendor.fullName,
      email: vendor.email,
      whatsappNumber: vendor.whatsappNumber,
      address: vendor.address,
      city: vendor.city,
      skills: vendor.skills,
      cnic: vendor.cnic,
      type: vendor.type,
      createdAt: vendor.createdAt,
    };

    res.status(200).json({ message: "Vendor logged in successfully", user: vendorData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const reportSend = async (req, res) => {
  const { issue } = req.body;

  try {
    if (!issue) {
      throw new Error("Issue must be filled");
    }
    const report = await Report.create({ issue });

    res.status(201).json({ message: "Report submitted successfully", report });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const report = async (req, res) => {
  try {
    const reports = await Report.find({});

    res.status(200).json(reports);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Get vendor details controller
export const getVendorDetails = async (req, res) => {
  const { vendorId } = req.params;

  try {
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      throw new Error("Vendor not found");
    }

    res.status(200).json(vendor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

