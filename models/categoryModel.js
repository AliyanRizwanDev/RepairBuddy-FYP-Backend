import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  online: { type: Number, default: 0 },
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;
