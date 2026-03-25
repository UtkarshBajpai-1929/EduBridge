import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJwt = asyncHandler(async (req, res, next) => {
try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new apiError(400, "Token not found");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
  
    if(!user){
      throw new apiError(400, "Unauthorised request");
    }
  
    req.user = user;
    next();
} catch (error) {
      console.log(error);
    throw new apiError(401, "Unauthorised request");
  }
});

export {
  verifyJwt,
}
