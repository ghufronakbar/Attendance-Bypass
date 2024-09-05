import { Course } from "@/models/Course";
import Cookie from "js-cookie";
import { EXPIRES, STORAGE_KEY } from "@/constant";
import getCourseCode from "./getCourseCode";

const date = new Date();
export interface AddCourse {
  name: string;
  encrypted: string;
}

const addCourse = async (course: AddCourse): Promise<Error | boolean> => {
  const code = Cookie.get(STORAGE_KEY);
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
      Cookie.set(STORAGE_KEY, JSON.stringify(courses), {
        expires: EXPIRES,
      });
      return true;
    } else {
      Cookie.set(STORAGE_KEY, JSON.stringify([newCourse]), {
        expires: EXPIRES,
      });
      return true;
    }
  } catch (error) {
    console.error(error);
    Cookie.set(STORAGE_KEY, JSON.stringify([]), {
      expires: EXPIRES,
    });
    return new Error("Failed to add course");
  }
};

export default addCourse;
