import mongoose, { Schema } from "mongoose";
import { generateSchoolId } from "../utils/generateSchoolId.js";
const schoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    schoolId: {
      type: String,
      required: true,
      default:  generateSchoolId,
      unique: true,
    },
    address:{
      type: String,
      required: true
    },
    contact:{
      type:Number,
      required :true
    }
  },
  { timestamps: true }
);
export const School = mongoose.model("School", schoolSchema);