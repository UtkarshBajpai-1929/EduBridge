import { User } from "../../models/user.model.js";
import { apiError } from "../../utils/apiError.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    throw new apiError(400, "Name and email are required");
  }

  const existingUser = await User.findOne({
    email: email.trim().toLowerCase(),
    _id: { $ne: req.user._id },
  });

  if (existingUser) {
    throw new apiError(409, "Email is already in use");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
      },
    },
    { new: true, runValidators: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new apiResponse(200, user, "Profile updated successfully"));
});

export const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new apiError(400, "Current password and new password are required");
  }

  if (newPassword.length < 6) {
    throw new apiError(400, "New password must be at least 6 characters");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new apiError(404, "User not found");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(currentPassword);
  if (!isPasswordCorrect) {
    throw new apiError(400, "Current password is incorrect");
  }

  user.password = newPassword;
  await user.save();

  return res
    .status(200)
    .json(new apiResponse(200, null, "Password updated successfully"));
});

export const deleteCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new apiError(404, "User not found");
  }

  await user.deleteOne();

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new apiResponse(200, null, "Account deleted successfully"));
});
