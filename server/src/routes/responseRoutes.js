import { Router } from "express";
import {
  createResponse,
  getResponses,
  deleteResponse
} from "../controllers/response.controller.js";

import { verifyJwt } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/roleAuth.js";
import { upload } from "../middlewares/multer.js";

export const responseRouter = Router();

responseRouter
  .route("/create")
  .post(
    verifyJwt,
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
    verifyJwt,
    getResponses
  );

responseRouter
  .route("/:id")
  .delete(
    verifyJwt,
    deleteResponse
  );