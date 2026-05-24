import { Video } from "../models/video.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const uploadVideo = asyncHandler(async (req, res) => {
  const { title, description, class: className, topic } = req.body;

  if (!title || !className || !topic || !description) {
    throw new apiError(400, "Required fields missing");
  }
  if (!req.files?.video?.length) {
    throw new apiError(400, "Video file required");
  }

  const uploadedVideo = await uploadOnCloudinary(req.files.video[0].path);
  if (!uploadedVideo?.url) {
    throw new apiError(500, "Video upload failed");
  }
 
  const video = await Video.create({
    title,
    description,
    class: className,
    topic,
    teacher: req.user._id,
    schoolId: req.user.schoolId,
    videoUrl: uploadedVideo.url
  });

  return res
    .status(201)
    .json(new apiResponse(201, video, "Video uploaded successfully"));
});

export const getStudentVideos = asyncHandler(async (req, res) => {
  const className = req.query.class || req.user?.className;

  if (!className) {
    throw new apiError(400, "Class is required");
  }

  const videos = await Video.find({
    class: className,
    schoolId: req.user.schoolId
  })
    .populate("teacher", "name")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new apiResponse(200, videos, "Videos fetched successfully"));
});
export const getTeacherVideos = asyncHandler(async (req, res) => {
  if(!req.user){
    throw new apiError(401, "Unauthorsed error")
  }

  const videos = await Video.find({
    teacher: req.user._id,
    schoolId: req.user.schoolId
  })
    .populate("teacher", "name")
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
