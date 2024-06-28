import { Router } from "express";
import {
  login,
  report,
  reportSend,
  signup,
  getVendors,
  getVendorDetails
} from "../controllers/vendorController.js";

const vendorRouter = Router();

vendorRouter.post("/signup", signup);
vendorRouter.post("/login", login);
vendorRouter.post("/report", reportSend);
vendorRouter.get("/report", report);
vendorRouter.get("/", getVendors);
vendorRouter.get("/:vendorId", getVendorDetails); // Add this line to get vendor details

export default vendorRouter;
