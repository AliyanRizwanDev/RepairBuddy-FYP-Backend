import { Router } from "express";
import { createCategory, getCategories } from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.post("/", createCategory);
categoryRouter.get("/", getCategories);

export default categoryRouter;
