import { Course } from "@/models/Course";
import Cookie from "js-cookie";
import { EXPIRES, STORAGE_KEY } from "@/constant";

const getCourse = (): Course[] => {
  const code = Cookie.get(STORAGE_KEY);
  try {
    if (code) {
      const data = JSON.parse(code);
      const reversedData = [...data].reverse();
      return reversedData;
    } else {
      Cookie.set(STORAGE_KEY, JSON.stringify([]), {
        expires: EXPIRES,
      });
      return [];
    }
  } catch (error) {
    Cookie.set(STORAGE_KEY, JSON.stringify([]), {
      expires: EXPIRES,
    });
    return [];
  }
};

export default getCourse;
