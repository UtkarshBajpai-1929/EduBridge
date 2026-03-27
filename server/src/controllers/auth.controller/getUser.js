import { apiResponse } from '../../utils/apiResponse.js';
import {asyncHandler} from '../../utils/asyncHandler.js'
import {apiError} from '../../utils/apiError.js'
export const getCurrentUser = asyncHandler(async(req,res)=>{
  const user = req.user;
  if(!user){
    throw new apiError(401, "Unauthorised request");
  }
  return res.status(200)
  .json(new apiResponse(200, user, "User fetched"));
})