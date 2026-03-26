import { User } from "../../models/user.model.js";
import { apiError } from "../../utils/apiError.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const generateAccessRefreshToken = async(userId)=>{
try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
  
    await user.save({validateBeforeSave:false});
    return {accessToken,refreshToken};
} catch (error) {
  console.log("Error while generating tokens");
}
}

const loginUser = asyncHandler(async(req,res)=>{
  const {email, password, schoolId} = req.body;
  if(!email || !password || !schoolId){
    throw new apiError(400, "All fields are required")
  }

  const user = await User.findOne({
    email : email
  });
  if(user.schoolId !== schoolId){
    throw new apiError(400, "User is not registered for this school");
  }
  if(!user){
    throw new apiError(400, "User not found");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if(!isPasswordCorrect){
    throw new apiError(400, "Wrong password");
  }

  //generate the access and refresh token 
  const {accessToken, refreshToken} = await generateAccessRefreshToken(user._id);
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  }
  return res.status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(new apiResponse(200, loggedInUser, "User log in success"));
});
export {
  loginUser,
}