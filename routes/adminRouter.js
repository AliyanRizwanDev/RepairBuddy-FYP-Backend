import { Router } from "express";
import {
  adminLogin,
  deleteUser,
  deleteVendor,
  getAllUsers,
  getAllVendors,
  getAllFeedback,
  getAllReports,
  deleteFeedback,
  deleteReport,
  adminSignup,
  deleteOrder,
} from "../controllers/adminController.js";

const adminRouter = Router();

adminRouter.post("/login", adminLogin);
adminRouter.post("/signup", adminSignup); 
adminRouter.delete("/user/:userId", deleteUser);
adminRouter.delete("/vendor/:vendorId", deleteVendor);
adminRouter.get("/users", getAllUsers);
adminRouter.get("/vendors", getAllVendors);
adminRouter.get("/feedback", getAllFeedback);
adminRouter.get("/reports", getAllReports);
adminRouter.delete("/feedback/:feedbackId", deleteFeedback);
adminRouter.delete("/report/:reportId", deleteReport);
adminRouter.delete("/order/:  ", deleteOrder); 

export default adminRouter;
