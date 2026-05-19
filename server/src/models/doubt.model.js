import mongoose from "mongoose";

const doubtSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    teacherId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    schoolId: {
      type: String,
      required: true,
    },
    title:{
      type:String,
      required: true
    },
    questionText: {
      type: String,
      required: true
    },
    image: {
      type: String,
    },

    status: {
      type: String,
      enum: ["open", "resolved"],
      default: "open",
    },
  },
  { timestamps: true }
);

export const Doubt = mongoose.model("Doubt", doubtSchema);