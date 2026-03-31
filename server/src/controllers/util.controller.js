import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const uploadProfile = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new apiError(400, "Unauthorised request");
  }

  if (!req.files || !req.files.profileImage) {
    throw new apiError(400, "Profile image is required");
  }

  const filePath = req.files.profileImage[0].path;

  const uploadedImage = await uploadOnCloudinary(filePath);

  const imageUrl = uploadedImage?.secure_url;

  if (!imageUrl) {
    throw new apiError(400, "No url received");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        profileImage: imageUrl,
      },
    },
    { new: true } 
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new apiResponse(200, user, "DP uploaded"));
});