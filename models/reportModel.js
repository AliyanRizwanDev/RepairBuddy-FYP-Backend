import mongoose, { Schema } from "mongoose";

const ReportSchema = Schema({
  issue: {
    type: String,
    require: true,
  },
  solution: {
    type: String,
    require: true,
  },
});

const Report = mongoose.model("Report", ReportSchema);
export default Report;
