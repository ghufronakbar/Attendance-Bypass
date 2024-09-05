import Cookie from "js-cookie";
import { EXPIRES, STORAGE_KEY } from "@/constant";
import getCourse from "./getCourse";

const deleteCourse = (code: string) => {
  const courses = getCourse();
  if (courses) {
    const find = courses.find((item) => item.code === code);
    if (find) {
      const index = courses.indexOf(find);
      courses.splice(index, 1);
      Cookie.set(STORAGE_KEY, JSON.stringify(courses), {
        expires: EXPIRES,
      });
    }
  } else {
    Cookie.set(STORAGE_KEY, JSON.stringify([]), {
      expires: EXPIRES,
    });
  }
};

export default deleteCourse;
