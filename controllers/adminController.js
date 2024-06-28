import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import Vendor from "../models/vendorModel.js";
import Feedback from "../models/feedbackModel.js";
import Report from "../models/reportModel.js";
import Order from '../models/orderModel.js'
import validator from "validator";

// Admin login controller
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
      throw new Error("Please enter a valid email address");
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const adminData = {
      _id: admin._id,
      email: admin.email,
      createdAt: admin.createdAt,
    };

    res.status(200).json({ message: "Admin logged in successfully", user: adminData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Admin delete user controller
export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Admin delete vendor controller
export const deleteVendor = async (req, res) => {
  const { vendorId } = req.params;

  try {
    const vendor = await Vendor.findByIdAndDelete(vendorId);
    if (!vendor) {
      throw new Error("Vendor not found");
    }

    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Admin get all users controller
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Admin get all vendors controller
export const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Admin get all feedback controller
export const getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.status(200).json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Admin get all reports controller
export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Admin delete feedback controller
export const deleteFeedback = async (req, res) => {
  const { feedbackId } = req.params;

  try {
    const feedback = await Feedback.findByIdAndDelete(feedbackId);
    if (!feedback) {
      throw new Error("Feedback not found");
    }

    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Admin delete report controller
export const deleteReport = async (req, res) => {
  const { reportId } = req.params;

  try {
    const report = await Report.findByIdAndDelete(reportId);
    if (!report) {
      throw new Error("Report not found");
    }

    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const adminSignup = async (req, res) => {
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

    const exist = await Admin.findOne({ email });
    if (exist) {
      throw new Error("Email is already in use");
    }

    const admin = await Admin.create({ email, password });

    const adminData = {
      _id: admin._id,
      email: admin.email,
      createdAt: admin.createdAt,
    };

    res.status(201).json({ message: "Admin created successfully", user: adminData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  const { orderId } = req.params;


  try {
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};