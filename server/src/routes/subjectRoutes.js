import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/roleAuth.js";
import { assignTeacher, createSubject, deleteSubject, getAllSubjects, getSubjects, updateSubject } from "../controllers/subject.controller.js";

const subjectRouter = Router();
subjectRouter.route('/create').post(verifyJwt,authorizeRoles("admin"),createSubject)
subjectRouter.route('/get').get(verifyJwt,getSubjects);
subjectRouter.route('/get-all').get(verifyJwt, authorizeRoles("admin"), getAllSubjects);
subjectRouter.route('/update/:id').patch(verifyJwt,authorizeRoles("admin"),updateSubject);
subjectRouter.route('/delete/:id').delete(verifyJwt,authorizeRoles("admin"),deleteSubject);
subjectRouter.route('/assign-teacher/:subjectId').patch(verifyJwt, authorizeRoles("admin"), assignTeacher);
export {
  subjectRouter,
}