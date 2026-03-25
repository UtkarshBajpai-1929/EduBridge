import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    class: {
      type: String,
      required: true,
    },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    schoolId: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Exam = mongoose.model("Exam", examSchema);