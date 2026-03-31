import { Router } from "express";
import registerSchool from "../controllers/school.controller/register.js";
import { verifyJwt } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/roleAuth.js";
import { deleteUser, getAllDoubts, getAllStudents, getAllTeachers, getAllVideos } from "../controllers/admin.controller.js";
const schoolRouter = Router();


schoolRouter.route('/register').post(registerSchool);

//admin routes 
schoolRouter.route('/get-students').get(verifyJwt, authorizeRoles("admin"), getAllStudents);
schoolRouter.route('/get-teachers').get(verifyJwt, authorizeRoles("admin"), getAllTeachers);
schoolRouter.route('/get-doubts').get(verifyJwt, authorizeRoles("admin"), getAllDoubts);
schoolRouter.route('/get-videos').get(verifyJwt, authorizeRoles("admin"), getAllVideos);
schoolRouter.route('/delete-user/:userId').delete(verifyJwt, authorizeRoles("admin"), deleteUser);
export default schoolRouter;