import { Doubt } from "../models/doubt.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createDoubt = asyncHandler(async (req, res) => {
  const { subject, questionText, title } = req.body;

  let imageUrl;

  if (req.file) {
    const uploadedImage = await uploadOnCloudinary(req.file.image[0].path);
    imageUrl = uploadedImage?.secure_url;
  }
  if(!subject){
    throw new apiError(400, "Subject is required");
  }
  if (!questionText && !imageUrl) {
    throw new apiError(400, "Doubt must contain text or image");
  }

  const doubt = await Doubt.create({
    student: req.user._id,
    subject,
    questionText,
    imageUrl,
    schoolId: req.user.schoolId,
    title,
  });

  return res
    .status(201)
    .json(new apiResponse(201, doubt, "Doubt created successfully"));
});
//get all doubts for a user
export const getStudentDoubts = asyncHandler(async(req,res)=>{
  if(!req.user){
    throw new apiError(401, "Unauthorised request");
  }

  const doubts =await Doubt.find({
    student: req.user?._id
  }).populate("student subject", "name className");

  return res.status(200)
  .json(new apiResponse(200, doubts, "Doubts fetched successfully"));
})
// get doubts (by subject)
export const getDoubts = asyncHandler(async (req, res) => {
  const { subject } = req.query;

  const doubts = await Doubt.find({
    subject,
    schoolId: req.user.schoolId
  })
    .populate("student", "name")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new apiResponse(200, doubts, "Doubts fetched successfully"));
});
// get single doubt
export const getSingleDoubt = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const doubt = await Doubt.findById(id)
    .populate("student", "name");

  if (!doubt) {
    throw new apiError(404, "Doubt not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, doubt, "Doubt fetched successfully"));
});