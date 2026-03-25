import { Video } from "../models/video.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const uploadVideo = asyncHandler(async (req, res) => {
  const { title, description, class: className, subject, topic } = req.body;

  if (!title || !className || !subject) {
    throw new apiError(400, "Required fields missing");
  }

  const videoFile = req.files.videoFile[0];

  if (!videoFile) {
    throw new apiError(400, "Video file required");
  }

  const uploadedVideo = await uploadOnCloudinary(videoFile.path);

  const video = await Video.create({
    title,
    description,
    class: className,
    subject,
    topic,
    teacher: req.user._id,
    schoolId: req.user.schoolId,
    videoUrl: uploadedVideo.url
  });

  return res
    .status(201)
    .json(new apiResponse(201, video, "Video uploaded successfully"));
});

export const getVideos = asyncHandler(async (req, res) => {
  const { class: className, subject } = req.query;

  if (!className || !subject) {
    throw new apiError(400, "Class and subject are required");
  }

  const videos = await Video.find({
    class: className,
    subject,
    schoolId: req.user.schoolId
  })
    .populate("teacher", "name")
    .populate("subject", "name")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new apiResponse(200, videos, "Videos fetched successfully"));
});

export const getSingleVideo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const video = await Video.findById(id)
    .populate("teacher", "name email")
    .populate("subject", "name");

  if (!video) {
    throw new apiError(404, "Video not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, video, "Video fetched successfully"));
});

export const deleteVideo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const video = await Video.findById(id);

  if (!video) {
    throw new apiError(404, "Video not found");
  }

  // allow teacher who uploaded OR admin
  if (
    video.teacher.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    throw new apiError(403, "Not authorized to delete this video");
  }

  await video.deleteOne();

  return res
    .status(200)
    .json(new apiResponse(200, {}, "Video deleted successfully"));
});