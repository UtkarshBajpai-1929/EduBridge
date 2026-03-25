import mongoose from "mongoose";

const responseSchema = new mongoose.Schema(
  {
    doubt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doubt",
      required: true,
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: {
      type: String,
    },

    imageUrl: {
      type: String,
    },

    videoUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Response = mongoose.model("Response", responseSchema);