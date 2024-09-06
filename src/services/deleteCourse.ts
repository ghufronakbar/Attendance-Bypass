import { STORAGE_KEY } from "@/constant";
import getCourse from "./getCourse";

const deleteCourse = (code: string) => {
  const courses = getCourse();
  if (courses) {
    const find = courses.find((item) => item.code === code);
    if (find) {
      const index = courses.indexOf(find);
      courses.splice(index, 1);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
    }
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
};

export default deleteCourse;
