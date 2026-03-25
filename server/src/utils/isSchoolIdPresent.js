import { School } from "../models/school.model.js"

export const isSchoolIdPresent = async(id)=>{
  const school = School.findOne({
    schoolId: id
  });
  return school;
}