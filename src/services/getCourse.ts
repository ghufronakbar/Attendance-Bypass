import { Course } from "@/models/Course";
import { STORAGE_KEY } from "@/constant";

const getCourse = (): Course[] => {
  const code = localStorage.getItem(STORAGE_KEY);
  try {
    if (code) {
      const data = JSON.parse(code);
      const reversedData = [...data].reverse();
      return reversedData;
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      return [];
    }
  } catch (error) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  }
};

export default getCourse;
