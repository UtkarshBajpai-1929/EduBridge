import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.js";
import { createDoubt, deleteDoubt, getDoubts, getSingleDoubt, getStudentDoubts, getTeacherDoubts } from "../controllers/doubt.controller.js";
import { authorizeRoles } from "../middlewares/roleAuth.js";
import { upload } from "../middlewares/multer.js";

const doubtRouter = Router();

doubtRouter.route('/create').post(verifyJwt,authorizeRoles("student"),
upload.fields([
  {
    name: "image"
   
  }
]),
createDoubt);
doubtRouter.route('/get-all').get(verifyJwt, getDoubts);
doubtRouter.route('/get-single/:id').get(verifyJwt, getSingleDoubt);
doubtRouter.route('/get-student').get(verifyJwt, authorizeRoles("student"), getStudentDoubts);
doubtRouter.route('/get-teacher').get(verifyJwt, authorizeRoles("teacher"),getTeacherDoubts);
doubtRouter.route('/delete/:id').delete(verifyJwt, deleteDoubt);
export {
  doubtRouter,
}