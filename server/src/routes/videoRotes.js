import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/roleAuth.js";
import { upload } from "../middlewares/multer.js";
import { deleteVideo, getSingleVideo, getVideos, uploadVideo } from "../controllers/video.controller.js";
const videoRouter = Router();

videoRouter.route('/upload').post(verifyJwt, authorizeRoles("teacher"), upload.fields([
  {
    name: "videoFile",
    maxCount: 1
  }
]), uploadVideo);
videoRouter.route('/get-all-video').get(verifyJwt,getVideos);
videoRouter.route('/get-single-video/:id').get(verifyJwt, getSingleVideo);
videoRouter.route('/delete/:id').delete(verifyJwt,deleteVideo);
export {
  videoRouter
}