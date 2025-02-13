import { Router } from "express";
import { createOrder, getOrders, updateOrderStatus } from "../controllers/orderController.js";

const orderRouter = Router();

orderRouter.post("/", createOrder);
orderRouter.get("/", getOrders);
orderRouter.put("/:id", updateOrderStatus);

export default orderRouter;
