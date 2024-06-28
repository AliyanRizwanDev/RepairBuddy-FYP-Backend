import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const VendorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  whatsappNumber: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  skills: { type: String, required: true },
  cnic: { type: String, required: true },
  type: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  averageRating: { type: Number, default: 0 },
  onTimePercentage: { type: Number, default: 100 },
});

VendorSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

VendorSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Vendor = mongoose.model("Vendor", VendorSchema);
export default Vendor;
