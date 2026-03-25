import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    class: {
      type: String,
      required: true,
    },

    schoolId: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    dueDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Assignment = mongoose.model("Assignment", assignmentSchema);