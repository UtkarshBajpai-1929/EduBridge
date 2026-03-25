import { Router } from "express";
import registerSchool from "../controllers/school.controller/register.js";
const schoolRouter = Router();


schoolRouter.route('/register').post(registerSchool);

export default schoolRouter;