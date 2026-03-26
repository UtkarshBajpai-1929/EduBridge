import { School } from "../../models/school.model.js";
import { User } from "../../models/user.model.js";
import { apiError } from "../../utils/apiError.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const registerSchool = asyncHandler(async(req,res)=>{
  const {name,address,admin,email,password,contact} = req.body;
  if(!name||!address || !contact || !email ||!password ||!admin){
    throw new apiError(400, "All fields are required");
  }
  const school = await School.create({
    name,
    address,
    contact,
  });
  const schoolId = school.schoolId;
  await User.create({
    name: admin,
    email,
    password,
    role: "admin",
    schoolId, 
  })
return res.status(201)
.json(new apiResponse(201, school, "School created successfully"))
});

export default registerSchool;