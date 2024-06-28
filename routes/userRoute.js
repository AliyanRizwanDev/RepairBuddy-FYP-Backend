import { Router } from "express";
import {
  feedbackSend,
  feedback,
  reportSend,
  report,
  signup,
  login,
  getUserDetails
} from "../controllers/userController.js";
import { createOrder, getOrders, updateOrderStatus } from "../controllers/orderController.js";

const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/feedback", feedbackSend);
userRouter.get("/feedback", feedback);
userRouter.post("/report", reportSend);
userRouter.get("/report", report);
userRouter.get("/:userId", getUserDetails); // Add this line to get user details

// // Order routes for users
// userRouter.post("/orders", createOrder);
// userRouter.get("/orders", getOrders);
// userRouter.put("/orders/status", updateOrderStatus);

export default userRouter;
