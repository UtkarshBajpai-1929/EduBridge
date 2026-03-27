import { Router } from "express";
import { registerUser } from "../controllers/auth.controller/registerUser.js";
import { loginUser } from "../controllers/auth.controller/login.js";
import { verifyJwt } from "../middlewares/auth.js";
import { logoutUser } from "../controllers/auth.controller/logout.js";
import { getCurrentUser } from "../controllers/auth.controller/getUser.js";

const userRouter = Router();

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);

//protected Routes
userRouter.route('/logout').post(verifyJwt, logoutUser);
userRouter.route('/get-current-user').get(verifyJwt, getCurrentUser)
export default userRouter;