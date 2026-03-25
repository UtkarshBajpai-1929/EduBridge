import { User } from "../../models/user.model.js";
import { apiError } from "../../utils/apiError.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const logoutUser = asyncHandler(async(req, res)=>{
  if(!req.user){
    throw new apiError(400, "No logged in user");
  }
  const user = await User.findByIdAndUpdate(req.user?._id,{
    $set:{
      refreshToken: undefined
    }
  });
  const options = {
    httpOnly: true,
    secure: true,
  }

  return res.status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(new apiResponse(200, null, "User logged out"));
});
export {
  logoutUser,
}