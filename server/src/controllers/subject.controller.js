import { Subject } from "../models/subject.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

// Create Subject (Admin)
export const createSubject = asyncHandler(async (req, res) => {
  const { name, class: className, teacherId } = req.body;

  if (!name || !className) {
    throw new apiError(400, "Name and class are required");
  }

  const subject = await Subject.create({
    name,
    class: className,
    teacher: teacherId || null,
    schoolId: req.user.schoolId,
  });

  return res
    .status(201)
    .json(new apiResponse(201, subject, "Subject created successfully"));
});


// Get Subjects by Class
export const getSubjects = asyncHandler(async (req, res) => {
  const { class: className } = req.query;

  const subjects = await Subject.find({
    class: className,
    schoolId: req.user.schoolId,
    isActive: true,
  }).populate("teacher", "name email");

  return res
    .status(200)
    .json(new apiResponse(200, subjects, "Subjects fetched successfully"));
});

// Update Subject
export const updateSubject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const subject = await Subject.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );

  if (!subject) {
    throw new apiError(404, "Subject not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, subject, "Subject updated successfully"));
});


// Deactivate Subject
export const deleteSubject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const subject = await Subject.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );

  if (!subject) {
    throw new apiError(404, "Subject not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, subject, "Subject removed successfully"));
});

export const assignTeacher = asyncHandler(async (req, res) => {
  const { subjectId } = req.params;
  const { teacherId } = req.body;

  const subject = await Subject.findById(subjectId);

  if (!subject) {
    throw new apiError(404, "Subject not found");
  }

  subject.teacher = teacherId;
  await subject.save();

  return res
    .status(200)
    .json(new apiResponse(200, subject, "Teacher assigned successfully"));
});