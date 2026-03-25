import { Router } from "express";
import {
  createResponse,
  getResponses,
  deleteResponse
} from "../controllers/response.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const responseRouter = Router();

responseRouter
  .route("/")
  .post(
    verifyJWT,
    authorizeRoles("teacher"),
    upload.fields([
      { name: "image", maxCount: 1 },
      { name: "video", maxCount: 1 }
    ]),
    createResponse
  );
  responseRouter
  .route('/:doubtId')
  .get(
    verifyJWT,
    getResponses
  );

responseRouter
  .route("/:id")
  .delete(
    verifyJWT,
    deleteResponse
  );

export default responseRouter;