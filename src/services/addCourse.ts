import { Course } from "@/models/Course";
import { STORAGE_KEY } from "@/constant";
import getCourseCode from "./getCourseCode";

const date = new Date();
export interface AddCourse {
  name: string;
  encrypted: string;
}

const addCourse = async (course: AddCourse): Promise<Error | boolean> => {
  const code = localStorage.getItem(STORAGE_KEY);
  const decrypted = getCourseCode(course.encrypted);
  if (decrypted instanceof Error) {
    return decrypted;
  }
  const newCourse: Course = {
    name: course.name,
    code: decrypted,
    createdAt: date.toString(),
  };
  try {
    if (code) {
      const courses: Course[] = JSON.parse(code);
      const findCode = courses.find((item) => item.code === newCourse.code);
      const findName = courses.find((item) => item.name === newCourse.name);
      if (findCode) {
        return new Error("Course code already exists");
      }
      if (findName) {
        return new Error("Course name already exists");
      }
      courses.push(newCourse);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
      return true;
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([newCourse]));
      return true;
    }
  } catch (error) {
    console.error(error);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return new Error("Failed to add course");
  }
};

export default addCourse;
