import { User } from "../../models/user.model.js";
import { apiError } from "../../utils/apiError.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { isSchoolIdPresent } from "../../utils/isSchoolIdPresent.js";
const registerUser = asyncHandler(async(req,res)=>{
  const {name, email, password, role, schoolId, className} = req.body;
  if(!name || !email || !password || !role || !schoolId){
    throw new apiError(400, "All fields are required");
  }
  if(!isSchoolIdPresent(schoolId)){
    throw new apiError(400, "No school found with this ID");
  }
  const user = await User.create({
    name, 
    email,
    password,
    role,
    schoolId,
    className
  });

  return res.status(201)
  .json(new apiResponse(201,user, "User created successfully"))
});

export {
  registerUser,
}