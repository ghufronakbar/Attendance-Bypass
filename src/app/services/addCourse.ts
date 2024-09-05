import { Course } from "@/models/Course";
import Cookie from "js-cookie";
import { STORAGE_KEY } from "@/constant";
import getCourseCode from "./getCourseCode";

const date = new Date();
export interface AddCourse {
  name: string;
  encrypted: string;
}

const addCourse = (course: AddCourse) => {
  console.log(course)
  const code = Cookie.get(STORAGE_KEY);
  const decrypted = getCourseCode(course.encrypted);
  if (decrypted instanceof Error){
    console.error(decrypted.message);
    return
  };
  const newCourse: Course = {
    name: course.name,
    code: decrypted,
    createdAt: date.toString(),
  };
  try {
    if (code) {
      const courses = JSON.parse(code);
      courses.push(newCourse);
      Cookie.set(STORAGE_KEY, JSON.stringify(courses));
    } else {
      Cookie.set(STORAGE_KEY, JSON.stringify([newCourse]));
    }
  } catch (error) {
    console.error(error);
    Cookie.set(STORAGE_KEY, JSON.stringify([]));
  }
};

export default addCourse;
