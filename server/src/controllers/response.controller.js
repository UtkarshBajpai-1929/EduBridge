import { Response } from "../models/response.model.js";
import { Doubt } from "../models/doubt.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


// Create Response (text / image / video)
export const createResponse = asyncHandler(async (req, res) => {
  const { doubtId, text } = req.body;
  if (!doubtId) {
    throw new apiError(400, "Doubt id is required");
  }

  const doubt = await Doubt.findById(doubtId);

  if (!doubt) {
    throw new apiError(404, "Doubt not found");
  }

  let imageUrl;
  let videoUrl;
  // image upload
  if (req.files?.image?.length) {
    const uploadedImage = await uploadOnCloudinary(req.files.image[0].path);
    imageUrl = uploadedImage?.secure_url;
  }

  // video upload
  if (req.files?.video?.length) {
    const uploadedVideo = await uploadOnCloudinary(req.files.video[0].path);
    videoUrl = uploadedVideo?.secure_url;
  }

  if (!text && !imageUrl && !videoUrl) {
    throw new apiError(400, "Response must contain text, image or video");
  }

  const response = await Response.create({
    doubt: doubtId,
    teacher: req.user._id,
    text,
    imageUrl,
    videoUrl
  });

  // mark doubt resolved
  doubt.status = "resolved";
  await doubt.save();

  return res
    .status(201)
    .json(new apiResponse(201, response, "Response added successfully"));
});


// Get responses of a doubt
export const getResponses = asyncHandler(async (req, res) => {
  const { doubtId } = req.params;

  if (!doubtId) {
    throw new apiError(400, "Doubt id required");
  }

  const responses = await Response.find({ doubt: doubtId })
    .populate("teacher", "name profileImage")
    .sort({ createdAt: 1 });

  return res
    .status(200)
    .json(new apiResponse(200, responses, "Responses fetched successfully"));
});


// Delete response (teacher or admin)
export const deleteResponse = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const response = await Response.findById(id);

  if (!response) {
    throw new apiError(404, "Response not found");
  }

  if (
    response.teacher.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    throw new apiError(403, "Not authorized to delete this response");
  }

  await response.deleteOne();

  return res
    .status(200)
    .json(new apiResponse(200, {}, "Response deleted successfully"));
});