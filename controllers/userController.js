import Feedback from "../models/feedbackModel.js";
import Report from "../models/reportModel.js";
import User from "../models/userModel.js";
import validator from "validator";
export const signup = async (req, res) => {
  const { fullName, email, password, whatsappNumber } = req.body;

  try {
    if (!fullName || !email || !password || !whatsappNumber) {
      throw new Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
      throw new Error("Please enter a valid email address");
    }
    if (password.length <= 6) {
      throw new Error("Please enter a strong password");
    }

    const exist = await User.findOne({ email });
    if (exist) {
      throw new Error("Email is already in use");
    }

    const user = await User.create({
      fullName,
      email,
      password,
      whatsappNumber,
    });
    const userData = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      whatsappNumber: user.whatsappNumber,
      createdAt: user.createdAt,
    };

    res
      .status(201)
      .json({ message: "User created successfully", user: userData });
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

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const userData = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      whatsappNumber: user.whatsappNumber,
      createdAt: user.createdAt,
    };

    res
      .status(200)
      .json({ message: "User logged in successfully", user: userData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const feedbackSend = async (req, res) => {
    const { issue, solution } = req.body;
    
    try {
      if (!issue || !solution) {
        throw new Error("All fields must be filled");
      }
  
      const feedback = await Feedback.create({ issue, solution });
  
      res.status(201).json({ message: "Feedback submitted successfully", feedback });
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
      const report = await Report.create({issue});
  
      res.status(201).json({ message: "Report submitted successfully", report });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

export const report = async (req, res) => {
    
    try {
      const report = await Report.find({});
  
      res.status(201).json(report);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

export const feedback = async (req, res) => {
    
    try {
      const report = await Feedback.find({});
  
      res.status(201).json(report);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

export const getUserDetails = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};