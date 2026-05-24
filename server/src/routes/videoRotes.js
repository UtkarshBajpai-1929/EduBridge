import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/roleAuth.js";
import { upload } from "../middlewares/multer.js";
import { deleteVideo, getSingleVideo, getStudentVideos, getTeacherVideos, uploadVideo } from "../controllers/video.controller.js";
const videoRouter = Router();

videoRouter.route('/upload').post(verifyJwt, authorizeRoles("teacher"), upload.fields([
  {
    name: "video",
    maxCount: 1
  }
]), uploadVideo);
videoRouter.route('/get-teacher-video').get(verifyJwt,authorizeRoles("teacher"), getTeacherVideos);
videoRouter.route('/get-student-video').get(verifyJwt, authorizeRoles("student"), getStudentVideos);
videoRouter.route('/get-single-video/:id').get(verifyJwt, getSingleVideo);
videoRouter.route('/delete/:id').delete(verifyJwt,deleteVideo);
export {
  videoRouter
}
