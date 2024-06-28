import mongoose, { Schema } from "mongoose";

const FeedbackSchema = Schema({
  issue: {
    type: String,
    require: true,
  },
  solution: {
    type: String,
    require: true,
  },
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);
export default Feedback;
