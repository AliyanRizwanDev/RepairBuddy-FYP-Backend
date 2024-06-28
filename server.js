import express from "express";
import userRouter from "./routes/userRoute.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors'
import vendorRouter from "./routes/vendorRoute.js";
import adminRouter from "./routes/adminRouter.js";
import chatRouter from "./routes/chatRoute.js";
import orderRouter from "./routes/orderRouter.js";
import categoryRouter from "./routes/categoryRoute.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/vendor", vendorRouter);
app.use("/api/orders", orderRouter);
app.use("/api/chats", chatRouter);
app.use("/api/categories", categoryRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listing to PORT ${process.env.PORT}`);
  mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    console.log("Connected to DB");

  })
  .catch(err => console.error(err));
});
