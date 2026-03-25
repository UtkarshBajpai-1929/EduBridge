import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    schoolId: {
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

    topic: {
      type: String,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    videoUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Video = mongoose.model("Video", videoSchema);