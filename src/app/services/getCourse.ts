import { Course } from "@/models/Course";
import Cookie from "js-cookie";
import { STORAGE_KEY } from "@/constant";

const getCourse = (): Course[] => {
  const code = Cookie.get(STORAGE_KEY);
  try {
    if (code) {
      return JSON.parse(code);
    } else {
      return [];
    }
  } catch (error) {
    Cookie.set(STORAGE_KEY, JSON.stringify([]));
    return [];
  }
};

export default getCourse;
