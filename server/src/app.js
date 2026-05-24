import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import schoolRouter from "./routes/schoolRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { subjectRouter } from "./routes/subjectRoutes.js";
import { videoRouter } from "./routes/videoRotes.js";
import { doubtRouter } from "./routes/doubtRoutes.js";
import {responseRouter} from "./routes/responseRoutes.js";
const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://edubridge-lemon-iota.vercel.app"
  ],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.use('/api/school', schoolRouter);
app.use('/api/user', userRouter);
app.use('/api/subject', subjectRouter);
app.use('/api/video', videoRouter);
app.use('/api/doubt', doubtRouter);
app.use('/api/response', responseRouter);
export default app;
