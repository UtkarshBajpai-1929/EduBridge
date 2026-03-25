import { customAlphabet } from "nanoid";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const nanoid = customAlphabet(alphabet, 6);

export const generateSchoolId = () => {
  return "SCH-" + nanoid();
};