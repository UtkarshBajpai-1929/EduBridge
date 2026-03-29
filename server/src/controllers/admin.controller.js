import { Doubt } from "../models/doubt.model.js";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllStudents = asyncHandler(async(req,res)=>{
  if(!req.user){
    throw new apiError(401, "Unauthorised Request");
  }
  const students =[...(await User.find({
    role: "student",
    schoolId: req.user?.schoolId
  }))];

  if(!students){
    throw new apiError(400, "No student");
  }
  return res.status(200)
  .json(new apiResponse(200, students, "Student fetched successfully"))
});

export const getAllTeachers = asyncHandler(async(req,res)=>{
  if(!req.user){
    throw new apiError(401, "Unauthorised Request");
  }
  const teachers =[...(await User.find({
    role: "teacher",
    schoolId: req.user?.schoolId
  }))];

  if(!teachers){
    throw new apiError(400, "No teacher");
  }
  return res.status(200)
  .json(new apiResponse(200, teachers, "Teacher fetched successfully"))
});

export const getAllDoubts = asyncHandler(async(req,res)=>{
  if(!req.user){
    throw new apiError(401, "Unauthorised request");
  }
  const doubts = [...(await Doubt.find({
    schoolId:req.user?.schoolId
  }))]
  return res.status(200)
  .json(new apiResponse(200, doubts, "Doubts fetched"));
});

export const getAllVideos = asyncHandler(async(req,res)=>{
  if(!req.user){
    throw new apiError(401, "Unauthorised request");
  }
  const videos = [...(await Video.find({
    schoolId:req.user?.schoolId
  }))]
  if(!videos){
    throw new apiError(400, "0 videos");
  }
  return res.status(200)
  .json(new apiResponse(200, videos, "videos fetched"));
});
