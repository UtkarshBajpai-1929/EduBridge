import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },

    marks: {
      type: Number,
      required: true,
    },

    grade: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Result = mongoose.model("Result", resultSchema);