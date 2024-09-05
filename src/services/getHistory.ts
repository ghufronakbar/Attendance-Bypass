import { History } from "@/models/History";
import Cookie from "js-cookie";
import { EXPIRES, HISTORY_KEY } from "@/constant";

const getHistory = (): History[] => {
  const code = Cookie.get(HISTORY_KEY);
  try {
    if (code) {
      const data = JSON.parse(code);
      const reversedData = [...data].reverse();
      return reversedData;
    } else {
      Cookie.set(HISTORY_KEY, JSON.stringify([]), {
        expires: EXPIRES,
      });
      return [];
    }
  } catch (error) {
    Cookie.set(HISTORY_KEY, JSON.stringify([]), {
      expires: EXPIRES,
    });
    return [];
  }
};

export default getHistory;
