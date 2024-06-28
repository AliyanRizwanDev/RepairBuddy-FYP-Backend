import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  issueMessage: { type: String, required: true },
  visitPrice: { type: Number, required: true },
  timeInHours: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Accepted', 'Visited', 'Completed'], default: 'Pending' },
  userAddress: { type: String, required: true },
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

OrderSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
